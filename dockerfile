FROM cypress/base:18.16.0

WORKDIR /mnt

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN chmod +x ./scripts/run.sh ./scripts/tests.sh

EXPOSE 9090