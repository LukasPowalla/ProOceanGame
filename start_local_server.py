from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import os
import webbrowser

PORT = 8080
os.chdir(Path(__file__).resolve().parent)
url = f"http://localhost:{PORT}/index.html"
print(f"Deine Ocean Van Klangreise startet unter: {url}")
print("Zum Beenden dieses Fensters Strg+C drücken.")
webbrowser.open(url)
ThreadingHTTPServer(("localhost", PORT), SimpleHTTPRequestHandler).serve_forever()
