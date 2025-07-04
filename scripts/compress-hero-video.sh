#!/bin/bash

# Hero Video Compression Script
# This script compresses the hero video for better web performance
# Requires ffmpeg to be installed: brew install ffmpeg (macOS) or apt-get install ffmpeg (Ubuntu)

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
INPUT_VIDEO="public/images/hero-video.mp4"
OUTPUT_MP4="public/images/hero-video-optimized.mp4"
OUTPUT_WEBM="public/images/hero-video-optimized.webm"
TARGET_SIZE_MB=1 # Target size in MB
BACKUP_DIR="public/images/backup"

echo -e "${GREEN}🎬 Hero Video Compression Script${NC}"
echo "=================================="

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo -e "${RED}❌ Error: ffmpeg is not installed${NC}"
    echo "Please install ffmpeg:"
    echo "  macOS: brew install ffmpeg"
    echo "  Ubuntu: sudo apt-get install ffmpeg"
    exit 1
fi

# Check if input video exists
if [ ! -f "$INPUT_VIDEO" ]; then
    echo -e "${RED}❌ Error: Input video not found: $INPUT_VIDEO${NC}"
    exit 1
fi

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Get original file size
ORIGINAL_SIZE=$(du -h "$INPUT_VIDEO" | cut -f1)
echo -e "${YELLOW}📊 Original video size: $ORIGINAL_SIZE${NC}"

# Backup original video
echo -e "${YELLOW}💾 Creating backup...${NC}"
cp "$INPUT_VIDEO" "$BACKUP_DIR/hero-video-original.mp4"

echo -e "${YELLOW}🔄 Compressing video...${NC}"

# Compress MP4 with optimized settings for web
# Using H.264 with CRF (Constant Rate Factor) for quality-based encoding
# CRF 28 provides good quality/size balance for background videos
ffmpeg -i "$INPUT_VIDEO" \
    -c:v libx264 \
    -crf 28 \
    -preset medium \
    -c:a aac \
    -b:a 128k \
    -movflags +faststart \
    -pix_fmt yuv420p \
    -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" \
    -y "$OUTPUT_MP4"

# Create WebM version for better compression
echo -e "${YELLOW}🔄 Creating WebM version...${NC}"
ffmpeg -i "$INPUT_VIDEO" \
    -c:v libvpx-vp9 \
    -crf 30 \
    -b:v 0 \
    -c:a libopus \
    -b:a 128k \
    -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" \
    -y "$OUTPUT_WEBM"

# Get compressed file sizes
MP4_SIZE=$(du -h "$OUTPUT_MP4" | cut -f1)
WEBM_SIZE=$(du -h "$OUTPUT_WEBM" | cut -f1)

echo -e "${GREEN}✅ Compression complete!${NC}"
echo "=========================="
echo -e "Original:     $ORIGINAL_SIZE"
echo -e "MP4 (H.264):  $MP4_SIZE"
echo -e "WebM (VP9):   $WEBM_SIZE"
echo ""
echo -e "${YELLOW}📝 Next steps:${NC}"
echo "1. Test the compressed videos in your browser"
echo "2. If quality is acceptable, replace the original:"
echo "   mv $OUTPUT_MP4 $INPUT_VIDEO"
echo "   mv $OUTPUT_WEBM public/images/hero-video.webm"
echo "3. Update your video component to use both formats"
echo ""
echo -e "${GREEN}🎯 Performance tip:${NC}"
echo "The WebM version is typically 20-30% smaller than MP4"
echo "Use both formats in your video element for best browser support"
