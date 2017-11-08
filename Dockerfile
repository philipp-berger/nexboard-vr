FROM tcloud/ubuntu-node:latest

ENV source="."
ENV target="/home/nexboard"
ENV DEV=true

EXPOSE 8080

RUN mkdir ${target}

COPY ${source} ${target}

RUN cd ${target} && npm install
# RUN cd ${target} && \
#     npm cache clean && \
#     (if ${DEV}; then npm install; else npm install --production --no-optional; fi)

# RUN cd ${target} && \
#     (if ! ${DEV}; then npm run build; fi)

CMD cd ${target} && npm start && tail -f /dev/null
