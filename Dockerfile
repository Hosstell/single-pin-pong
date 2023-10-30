FROM node:18-slim

ARG ANDROID_APP_URL

EXPOSE 3000

WORKDIR /project
COPY . .

WORKDIR /project/server
RUN npm i

WORKDIR /project/game
RUN npm i --force
RUN npx vite build

RUN mkdir -p /project/server/static/objects/rocket
RUN cp -r /project/game/dist/* /project/server/static
RUN cp -r /project/game/objects/rocket/* /project/server/static/objects/rocket
RUN cp /project/client/app.apk /project/server/static/app.apk

WORKDIR /project/server
CMD ["npm", "run", "start"]
