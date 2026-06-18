# Sustainable Tomorrow Hackathon Project

# Installation

> [!IMPORTANT] Requirements (Linux/MacOS)
> Make sure you have `nix` installed on your `$PATH`

For Linux/MaxOS users, enter the development shell with  
```bash
nix develop -c $SHELL
```

then
```bash
python app.py
```
to run the server.

For Windows users, run the following command to ensure you have necessary
```powershell
pip install -r requirements.txt
```

Make sure you are in the pip virtual environment as well.


# Running

For testing the API:
```shell
curl -X POST http://127.0.0.1:5000/api/calculate \
     -H "Content-Type: application/json" \
     -d '{"input_value": "test"}'
```
