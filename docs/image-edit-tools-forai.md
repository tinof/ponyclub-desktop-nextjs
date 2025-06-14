Here are the most suitable command-line tools for your image editing tasks on macOS:
ImageMagick: The All-in-One Powerhouse
ImageMagick is a free, open-source software suite for image manipulation and is widely considered the gold standard for command-line image processing.[4][5] It is available for macOS and can handle all of the tasks you require with a high degree of control.[5]
Key Commands:
magick convert: To convert between formats, resize, crop, and perform various other edits.[4][6]
magick mogrify: To perform batch processing on multiple images.[7][8]
How to Install ImageMagick:
The easiest way to install ImageMagick on macOS is by using the Homebrew package manager. If you don't have Homebrew installed, you can get it at brew.sh.
brew install imagemagick
Use code with caution.
Bash
Example Commands for Your Tasks:
Convert WebP to JPG and Resize/Crop (Primary Recommendation 1):
magick convert hero-image.webp -resize 1200x630^ -gravity center -extent 1200x630 public/images/og-image-ponyclub.jpg
Explanation: This command first resizes the image to fill the 1200x630 dimensions while maintaining the aspect ratio (^), then crops from the center to the exact dimensions.[6]
Crop to a Specific Aspect Ratio (Primary Recommendation 2):
magick convert rafting-big-1200x800.jpg -gravity center -crop 1200x630+0+0 +repage public/images/rafting-og.jpg
Explanation: This crops the image to 1200x630, taking the crop from the center (-gravity center).
Convert WebP to JPG and Resize (Primary Recommendation 3):
magick convert Kano-e1711549679949-1.webp -resize 1200x630 public/images/kayaking-og.jpg
Explanation: This will convert the format and resize the image to fit within a 1200x630 bounding box while maintaining the original aspect ratio. For a precise fit, you might need to crop as well.
sips: The Built-in macOS Tool
macOS comes with a native command-line tool called sips (Scriptable Image Processing System). It's incredibly fast and useful for basic conversions and resizing without needing to install any additional software.[9][10]
Key Flags:
-s format jpeg: To convert an image to JPEG format.[11]
-Z: To resize an image, maintaining the aspect ratio, to a maximum width or height.[9][10]
Example Commands for Your Tasks:
Convert WebP to JPG (Primary Recommendation 1 & 3): sips can handle WebP if macOS has the necessary support.
sips -s format jpeg hero-image.webp --out public/images/og-image-ponyclub.jpg
Simple Resizing (Primary Recommendation 4):
sips -Z 1200 public/images/HorseRiders_BlueNatural_Scenic_RiverCanyon.jpg --out public/images/riding-og.jpg
Explanation: This resizes the image so that its longest side is 1200 pixels.[10] Note that for a precise 1200x630 crop, ImageMagick provides more direct control.
Other Notable Tools
ffmpeg: While primarily known for video, ffmpeg is also excellent at converting between a vast array of image formats.[12][13]
Example Conversion: ffmpeg -i image.webp image.jpg[13]
Summary and Recommendation
For your specific list of image editing requirements, ImageMagick is the most suitable and comprehensive command-line tool. It gives you precise control over conversion, resizing, and cropping in a single command, which is exactly what your action plan calls for.
The built-in sips utility is a great, lightweight option for quick resizing and format changes if you don't need complex cropping.