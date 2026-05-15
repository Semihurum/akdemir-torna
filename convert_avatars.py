import os
from PIL import Image

folder = os.path.join("public", "assets", "avatars")
for i in range(1, 11):
    filename_png = f"avatar_{i:02d}.png"
    filename_webp = f"avatar_{i:02d}.webp"
    path_png = os.path.join(folder, filename_png)
    path_webp = os.path.join(folder, filename_webp)
    if os.path.exists(path_png):
        img = Image.open(path_png)
        img.save(path_webp, "webp")
        os.remove(path_png)
        # Also remove svg if exists
        path_svg = os.path.join(folder, f"avatar_{i:02d}.svg")
        if os.path.exists(path_svg):
            os.remove(path_svg)
        print(f"Converted {filename_png} to {filename_webp}")
