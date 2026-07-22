# maker-flow intro site

Static English intro page for [LJTian/maker-flow](https://github.com/LJTian/maker-flow).

See `pro.md` for scope and acceptance criteria.

## Run

```bash
cp -n .env.example .env
docker compose up --build
```

- Site: http://localhost:3000/
- Health: http://localhost:3000/health

Optional local dev: `npm install && npm run dev` → http://localhost:5173
