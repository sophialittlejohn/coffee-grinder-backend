FROM mhart/alpine-node:15	

WORKDIR /usr/app	

COPY package.json yarn.lock tsconfig.json ./	

COPY /src /src/schema.graphql ./src/	

COPY /prisma/schema.prisma .env ./	

RUN yarn install

RUN yarn build

CMD [ "yarn", "start" ]