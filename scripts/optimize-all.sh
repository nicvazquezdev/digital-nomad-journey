#!/bin/bash

echo "🖼️  Mass image optimization for Vercel"
echo "================================================"
echo ""

# Verify that bc is available for calculations
if ! command -v bc &> /dev/null; then
    echo "❌ bc is not installed. Installing..."
    brew install bc 2>/dev/null || echo "⚠️  Please install bc manually: brew install bc"
    exit 1
fi

# Directorios
ASSETS_DIR="public/assets"
BACKUP_DIR="public/assets-backup"
OPTIMIZED_DIR="public/assets-optimized"

echo "📂 Checking directories..."
if [ ! -d "$ASSETS_DIR" ]; then
    echo "❌ The $ASSETS_DIR directory was not found."
    exit 1
fi

echo "💾 Creating backup of original directory..."
if [ -d "$BACKUP_DIR" ]; then
    echo "⚠️  A backup already exists. Do you want to overwrite it? (y/N)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        echo "📁 Using existing backup..."
    else
        rm -rf "$BACKUP_DIR"
        cp -R "$ASSETS_DIR" "$BACKUP_DIR"
        echo "✅ Backup created in $BACKUP_DIR"
    fi
else
    cp -R "$ASSETS_DIR" "$BACKUP_DIR"
    echo "✅ Backup created in $BACKUP_DIR"
fi

echo "🔧 Creating optimized directory..."
rm -rf "$OPTIMIZED_DIR"
mkdir -p "$OPTIMIZED_DIR"

# Function to convert bytes to MB
bytes_to_mb() {
    echo "scale=2; $1 / 1024 / 1024" | bc -l
}

echo ""
echo "🚀 Starting optimization..."
echo "   - JPEG quality: 85%"
echo "   - Maximum resolution: 1920px"
echo "   - Output format: JPEG"
echo ""

total_original=0
total_optimized=0
total_images=0
start_time=$(date +%s)

# Process each country
for country_dir in "$ASSETS_DIR"/*; do
    if [ -d "$country_dir" ]; then
        country=$(basename "$country_dir")
        echo "🌍 Processing $country..."
        
        # Create country directory
        mkdir -p "$OPTIMIZED_DIR/$country"
        
        country_original=0
        country_optimized=0
        country_images=0
        
        # Process each image
        for ext in jpg jpeg png JPG JPEG PNG webp WEBP; do
            for image in "$country_dir"/*.$ext; do
                if [ ! -f "$image" ]; then
                    continue
                fi
                
                filename=$(basename "$image")
                # Change extension to .jpg for all optimized images
                output_filename="${filename%.*}.jpg"
                output="$OPTIMIZED_DIR/$country/$output_filename"
                
                # Get original size
                original_size=$(stat -f%z "$image" 2>/dev/null || echo 0)
                
                # Optimize with sips
                if sips -s format jpeg -s formatOptions 85 --resampleHeightWidthMax 1920 "$image" --out "$output" >/dev/null 2>&1; then
                    # Get optimized size
                    optimized_size=$(stat -f%z "$output" 2>/dev/null || echo 0)
                    
                    if [ $original_size -gt 0 ] && [ $optimized_size -gt 0 ]; then
                        reduction=$(echo "scale=1; ($original_size - $optimized_size) * 100 / $original_size" | bc -l)
                        original_mb=$(bytes_to_mb $original_size)
                        optimized_mb=$(bytes_to_mb $optimized_size)
                        echo "     ✅ $filename: ${original_mb}MB → ${optimized_mb}MB (-${reduction}%)"
                        
                        country_original=$((country_original + original_size))
                        country_optimized=$((country_optimized + optimized_size))
                        country_images=$((country_images + 1))
                    fi
                else
                    echo "     ❌ Error processing $filename"
                fi
            done
        done
        
        # Show summary of the country
        if [ $country_original -gt 0 ]; then
            country_reduction=$(echo "scale=1; ($country_original - $country_optimized) * 100 / $country_original" | bc -l)
            country_original_mb=$(bytes_to_mb $country_original)
            country_optimized_mb=$(bytes_to_mb $country_optimized)
            echo "     📊 $country: ${country_images} imágenes, ${country_original_mb}MB → ${country_optimized_mb}MB (-${country_reduction}%)"
        fi
        echo ""
        
        total_original=$((total_original + country_original))
        total_optimized=$((total_optimized + country_optimized))
        total_images=$((total_images + country_images))
    fi
done

end_time=$(date +%s)
duration=$((end_time - start_time))

# Final summary
echo "✨ OPTIMIZATION COMPLETED!"
echo "================================================"
if [ $total_original -gt 0 ]; then
    total_reduction=$(echo "scale=1; ($total_original - $total_optimized) * 100 / $total_original" | bc -l)
    total_original_gb=$(echo "scale=2; $total_original / 1024 / 1024 / 1024" | bc -l)
    total_optimized_gb=$(echo "scale=2; $total_optimized / 1024 / 1024 / 1024" | bc -l)
    savings_gb=$(echo "scale=2; ($total_original - $total_optimized) / 1024 / 1024 / 1024" | bc -l)
    
    echo "📈 Final statistics:"
    echo "   🖼️  Total images processed: $total_images"
    echo "   📏 Original size: ${total_original_gb}GB"
    echo "   🗜️  Optimized size: ${total_optimized_gb}GB"
    echo "   🎯 Total reduction: ${total_reduction}%"
    echo "   💾 Space savings: ${savings_gb}GB"
    echo "   ⏱️  Processing time: ${duration}s"
    echo ""
    echo "🔄 NEXT STEP:"
    echo "To apply the optimizations run:"
    echo "   mv public/assets public/assets-original"
    echo "   mv public/assets-optimized public/assets"
    echo ""
    echo "To revert if necessary:"
    echo "   mv public/assets public/assets-optimized"
    echo "   mv public/assets-original public/assets"
else
    echo "❌ No images found to optimize"
fi

# Clean up test file
rm -rf test-optimization
