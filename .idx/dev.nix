{ pkgs, ... }: {
  channel = "stable-24.05";

  packages = [
    pkgs.nodejs_20  # Node.js for the frontend
    (pkgs.python312.withPackages (ps: with ps; [
      pip
      google-generativeai
      pkgs.python312Packages.pyngrok  # Python dependencies for the AI agent
    ]))
    pkgs.python-launcher  # Python launcher
  ];

  idx = {
    extensions = [
      "svelte.svelte-vscode"  # Svelte support for frontend
      "vue.volar"  # Vue support for frontend
    ];

    previews = {
      enable = true;
      previews = {
        web = {
          command = [
            "npm"
            "run"
            "dev"
            "--"
            "--port"
            "$PORT"
            "--host"
            "0.0.0.0"
          ];
          manager = "web";  # Manage web preview for the frontend
        };
      };
    };

    workspace = {
      onCreate = {};  # Workspace setup on creation
      onStart = {};  # Workspace setup on start
    };
  };

  env = {};  # Add any specific environment setup here if needed
}
