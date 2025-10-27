/**
 * QR Code Generator - Iraqi Election Platform
 * Generates multiple sizes of QR codes for different use cases
 */

const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

// Configuration
const TARGET_URL = process.env.APP_URL || 'https://iraqelection.app';
const OUTPUT_DIR = path.join(__dirname, '../../frontend/public/qr');

// QR code sizes for different use cases
const SIZES = [
  { name: 'small', width: 200, purpose: 'Social media, mobile sharing' },
  { name: 'medium', width: 400, purpose: 'Posters, flyers' },
  { name: 'large', width: 800, purpose: 'Billboards, large format prints' },
  { name: 'xlarge', width: 1200, purpose: 'High-resolution printing' }
];

// QR code styling options
const QR_OPTIONS = {
  errorCorrectionLevel: 'H', // High error correction (30% recovery)
  type: 'image/png',
  quality: 1,
  margin: 2,
  color: {
    dark: '#000000',  // Black QR code
    light: '#FFFFFF'  // White background
  }
};

/**
 * Main generation function
 */
async function generateQRCodes() {
  console.log('🎨 QR Code Generator for Iraqi Election Platform\n');
  console.log(`📍 Target URL: ${TARGET_URL}`);
  console.log(`📂 Output Directory: ${OUTPUT_DIR}\n`);
  
  // Create output directory if it doesn't exist
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log('✅ Created output directory\n');
  }
  
  // Generate QR codes for each size
  for (const size of SIZES) {
    try {
      const filename = `app-qr-${size.name}.png`;
      const filepath = path.join(OUTPUT_DIR, filename);
      
      const options = {
        ...QR_OPTIONS,
        width: size.width
      };
      
      await QRCode.toFile(filepath, TARGET_URL, options);
      
      console.log(`✅ Generated: ${filename}`);
      console.log(`   Size: ${size.width}x${size.width}px`);
      console.log(`   Use: ${size.purpose}\n`);
      
    } catch (error) {
      console.error(`❌ Failed to generate ${size.name}:`, error.message);
    }
  }
  
  // Also generate the default app.png for backward compatibility
  try {
    const defaultPath = path.join(OUTPUT_DIR, 'app.png');
    await QRCode.toFile(defaultPath, TARGET_URL, {
      ...QR_OPTIONS,
      width: 400
    });
    console.log('✅ Generated: app.png (default, 400x400)');
  } catch (error) {
    console.error('❌ Failed to generate default QR code:', error.message);
  }
  
  console.log('\n🎉 QR Code generation complete!');
  console.log('\n📋 Next steps:');
  console.log('   1. Verify QR codes in:', OUTPUT_DIR);
  console.log('   2. Test by scanning with mobile device');
  console.log('   3. Deploy frontend with updated QR codes');
  console.log('\n💡 Tip: Test QR codes at: https://qrcode.tec-it.com/en/reader');
}

// Run generator
generateQRCodes().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
