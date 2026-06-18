# Sustainable Tomorrow Hackathon Project

> [!note] Requirements
> Make sure you have `nix` installed on your `$PATH`

Run 
```bash
nix develop -c $SHELL
```

then
```bash
python app.py
```

For testing the API (Linux/MacOS user):
```bash
curl -X POST http://127.0.0.1:5000/api/calculate \
     -H "Content-Type: application/json" \
     -d '{"input_value": "test"}'
```

For testing the API (Windows):
```powershell
pip install -r requirements.txt
```
