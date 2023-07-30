FROM node

EXPOSE 3000

WORKDIR /project
COPY . .

WORKDIR /project/game
RUN npm i
RUN npx vite build

#CMD ["sleep", "10000000"]

RUN cp -r /project/game/dist/* /project/server/static
RUN cp -r /project/game/objects/* /project/server/static

WORKDIR /project/server
CMD ["npm", "run", "start"]
