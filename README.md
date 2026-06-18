# Sustainable Tomorrow Hackathon Project

Run 
```bash
nix develop -c $SHELL
```

then
```bash
python app.py
```

For testing the API:
```bash
curl -X POST http://127.0.0.1:5000/api/calculate \
     -H "Content-Type: application/json" \
     -d '{"input_value": "test"}'
```
