{ pkgs, mkShell, ...}:
mkShell {
    buildInputs = with pkgs.python314Packages; [
      flask
      flask-api
      flask-cors
      pkgs.curlFull
    ];
}
