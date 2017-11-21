// @flow

/**
 * This middleware is responsible for handling incoming actions that trigger a change
 * within the whiteboard.
 * Every Socketmessage coming from the server is being adapted as a Redux message. Those
 * incoming messages pass this middleware and need to be handled here.
 */

import type { Store } from 'redux';

import { NEW_SYNCED, CHANGE_SYNCED, DELETE_SYNCED,
  CHANGE_FLOW_SYNCED, ADD_ITEM, ADD_BACKGROUND_IMAGE, REMOVE_ITEM } from '../constants/ActionTypes';

// Model
import Stickynote from '../items/stickynote';
import Scribble from '../items/scribble';
import Votingdot from '../items/votingdot';
import Cluster from '../items/cluster';
import Link from '../items/link';
import Background from '../items/background';

// Constants
import type { ReduxActionType, NetworkReduxActionType } from '../types/components/Redux.js';
import type { WhiteboardItemsType } from '../types/components/Whiteboard.js';
import type { DatabaseObjectType } from '../types/items/index.js';
import type { ScribbleDataType } from '../types/items/Scribble.js';
import type { StickynoteDataType } from '../types/items/Stickynote.js';
import type { ClusterDataType } from '../types/items/Cluster.js';
import type { LinkDataType } from '../types/items/Link.js';
import type { TransformedPayloadType } from '../types/Middlewares.js';

const nexboardMiddleware = (store: Store<*, *>) => (next: (ReduxActionType) => void) => (action: NetworkReduxActionType<*>) => {
  // Depending on the incoming action, another one is being propagated to
  // trigger the correct changes to the state
  const items: WhiteboardItemsType = store.getState().items;
  // TODO: Right now flow is not able to detect which action we get based on the action.type
  // BDrive Frontend therefore defines all action types manually.
  if (!action.payload) {
    next(action);
    return;
  };

  switch(action.type){
  case NEW_SYNCED:
    // See case change_synced why this check is neccessary
    if((!(action.payload.data.id in items) || action.payload.data.type === 'vt')){
      const payload = createNewItemView(items, action.payload.data);
      let actionType = ADD_ITEM;
      if(action.payload != null && action.payload.data.type === 'wb'){
        actionType = ADD_BACKGROUND_IMAGE;
      }
      next({
        type: actionType,
        payload,
      });
    }
    break;
  case CHANGE_FLOW_SYNCED:
    // Do not call next so the action won't be propagated through to other
    // middlewares nor the reducers
    changeFlow(items, action.payload.data, action.payload.tool);
    break;
  case CHANGE_SYNCED:
    /**
       * TODO(low): Remove this special case. It is neccessary, because,
       *            if the old client directly creates a postit with a text,
       *            it sends a 'change' message first, and the 'new' message
       *            afterwards
       */
    if (action.payload.data.id in items){
      change(items, action.payload.data);
    } else {
      const payload = createNewItemView(items, action.payload.data);
      next({
        type: ADD_ITEM,
        payload,
      });
    }
    break;
  case DELETE_SYNCED:
    // $FlowFixMe the type of this action is a string
    remove(items, action.payload.data);
    next({
      type: REMOVE_ITEM,
      // $FlowFixMe TODO: payload may be undefined -> Rewrite definition of action as pointed out above
      payload: { item: items[action.payload.data.id] },
    });
    break;
  default:
    break;
  }
  next(action);
};
/**
 * Called whenever a new Item was created by another client.
 * Gets all the exisiting items and the data for the new Item.
 * @param {*} items
 * @param {*} data
 */
function createNewItemView(items: WhiteboardItemsType, data: DatabaseObjectType<*>): ?TransformedPayloadType {
  try {
    switch(data.type){
    case 'pt':
      // $FlowFixMe data is a stickynote
      const stickynoteData: DatabaseObjectType<StickynoteDataType> = data;
      const stickynoteModel = new Stickynote.Model();
      stickynoteModel.fromDBObject(stickynoteData);
      const stickynoteView = new Stickynote.View(stickynoteModel);

      if (stickynoteData.ctId && items[stickynoteData.ctId]) {
        items[stickynoteData.ctId].controller.addChild(stickynoteView.controller);
        stickynoteView.update();
      };
      return { item: stickynoteView };
    case 'vt':
      let votingdotView;
      const color = data.data.cl;
      const votingdotModel = new Votingdot.Model({ color });
      votingdotModel.fromDBObject(data);
      // $FlowFixMe votingdots always have a parent id
      votingdotView = new Votingdot.View(votingdotModel, items[data.ctId].controller);
      votingdotView.update();

      return { item: votingdotView };
    case 'sb':
      // $FlowFixMe data is a scribble
      const scribbleData: DatabaseObjectType<ScribbleDataType> = data;
      const scribbleModel = new Scribble.Model();
      scribbleModel.fromDBObject(scribbleData);
      const scribbleView = new Scribble.View(scribbleModel);

      if (scribbleData.ctId && items[scribbleData.ctId]) {
        items[scribbleData.ctId].controller.addChild(scribbleView.controller);
        scribbleView.update();
      };
      return { item: scribbleView };
    case 'ct':
      // $FlowFixMe data is a cluster
      const clusterData: DatabaseObjectType<ClusterDataType> = data;
      const clusterModel = new Cluster.Model();
      clusterModel.fromDBObject(clusterData);
      const clusterView = new Cluster.View(clusterModel);
      return { item: clusterView };
    case 'ln':
      // $FlowFixMe data is a link
      const linkData: DatabaseObjectType<LinkDataType> = data;
      const linkFrom = items[linkData.data.fm];
      const linkTo = items[linkData.data.to];

      const linkModel = new Link.Model(linkFrom, linkTo);
      linkModel.fromDBObject(linkData);
      const linkView = new Link.View(linkModel);
      return { item: linkView };
    case 'wb':
      // $FlowFixMe data is a background image
      const backgroundData: DatabaseObjectType<BackgroundDataType> = data;
      const wbBackgroundModel = new Background.Model();
      wbBackgroundModel.fromDBObject(backgroundData);
      const wbBackgroundView = new Background.View(wbBackgroundModel);
      return { item: wbBackgroundView };
    default:
      console.error('Unexpected database type. Try to handle it as a stickynote', data);
      return undefined;
    }
  } catch(exc) {
    console.error('Failed creating item (corrupt data?)', exc);
    return undefined;
  }
}

/**
 * Called on a change of a specific item
 * @param {*} items - All Items existing on the whiteboard
 * @param {*} data  - The data containing the changes
 */
function changeFlow(items: WhiteboardItemsType, data: DatabaseObjectType<*>, tool?: string){
  // Update Model and rerender
  items[data.id].model.fromDBObject(data);
  items[data.id].controller.update();
}

/**
 * Called on a change of a specific item
 * @param {*} items - All Items existing on the whiteboard
 * @param {*} data  - The data containing the changes
 */
function change(items: WhiteboardItemsType, data: DatabaseObjectType<*>){
  const itemView = items[data.id];
  const oldParent = itemView.model.parentId;
  // Update Model and rerender
  itemView.model.fromDBObject(data);

  // check if parent changed
  if (data.ctId !== oldParent) {
    const parentController = data.ctId && items[data.ctId] ? items[data.ctId].controller : null;
    itemView.controller.changeParent(parentController);
    itemView.update();
  }

  itemView.controller.update();
  if (data.type === 'sb' && itemView.controller instanceof Stickynote.Controller) {
    itemView.controller.finish();
  }
}

/**
 * Called on a remove event of a specific item
 * @param {*} items - All Items existing on the whiteboard
 * @param {*} id  - The id of the item
 */
function remove(items: WhiteboardItemsType, id: string){
  if (items[id]) items[id].controller.remove();
}

export default nexboardMiddleware;
