{
    description = "A very basic flake";

    inputs = {
        nixpkgs.url = "github:nixos/nixpkgs/nixos-26.05";
    };
    
    outputs = { self, nixpkgs, ...}@inputs:
    let 
        forAllSystems = function:
            nixpkgs.lib.genAttrs [
                "x86_64-linux"
                "aarch64-linux"
                "x86_64-darwin"
            ] (system: function nixpkgs.legacyPackages.${system});
    in
    {
        devShells = forAllSystems (pkgs: {
            default = pkgs.callPackage ./shell.nix {};
        });
    };
}
