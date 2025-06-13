import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputDir = path.resolve('public/img');
const imageTypes = ['.png', '.jpg', '.jpeg'];

fs.readdirSync(inputDir).forEach(file => {
	const ext = path.extname(file).toLowerCase();
	
	if (!imageTypes.includes(ext)) return;
	
	const inputPath = path.join(inputDir, file);
	const outputPath = inputPath.replace(ext, '.webp');
	
	// Skipped
	if (fs.existsSync(outputPath)) {
		console.log(`⏩ Skipped: ${file} → already there .webp`);
		return;
	}
	
	// Converting
	sharp(inputPath)
		.webp({ quality: 90 })
		.toFile(outputPath)
		.then(() => {
			console.log(`✅ Converted: ${file} → ${path.basename(outputPath)}`);
			
			// Deleting the original
			fs.unlinkSync(inputPath);
			console.log(`🗑️ Original was deleted: ${file}`);
		})
		.catch(err => console.error(`❌ Error during processing ${file}:`, err));
});
