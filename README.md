# node-docker-app

Playground for docker and node

Install Docker

### Run It

```
docker-compose up
```

OR

```
docker-compose up -d
```

## Init DB

After containers are up

```
docker exec -it node-api npm run init-db
```

## Run Tests

After containers are up

```
docker exec -it node-api npm run test
```
