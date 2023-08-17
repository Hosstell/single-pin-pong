FROM node

ARG ANDROID_APP_URL

EXPOSE 3000

WORKDIR /project
COPY . .

WORKDIR /project/game
RUN npm i --force
RUN npx vite build

RUN cp -r /project/game/dist/* /project/server/static
RUN cp -r /project/game/objects/* /project/server/static

WORKDIR /project/server
CMD ["npm", "run", "start"]
