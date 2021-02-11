FROM mhart/alpine-node:15	

WORKDIR /usr/app	

COPY package.json yarn.lock .env ./		

COPY /dist /src/schema.graphql ./src/	

COPY /prisma/schema.prisma ./prisma/	

RUN yarn install --production

RUN yarn build

CMD [ "yarn", "start" ]