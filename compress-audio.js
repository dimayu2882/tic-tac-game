import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import path from 'path';

const inputDir = 'public/audio';
const supportedExtensions = ['.mp3', '.wav', '.ogg', '.m4a', '.aac'];

fs.readdirSync(inputDir).forEach(file => {
	const ext = path.extname(file).toLowerCase();
	if (!supportedExtensions.includes(ext)) return;
	
	const inputPath = path.join(inputDir, file);
	const outputFileName = path.basename(file, ext) + '.mp3';
	const tempOutputPath = path.join(inputDir, `temp_${outputFileName}`);
	const finalOutputPath = path.join(inputDir, outputFileName);
	
	// Getting the size of the source file
	const inputSize = fs.statSync(inputPath).size;
	
	ffmpeg(inputPath)
		.audioBitrate('96k')
		.toFormat('mp3')
		.on('end', () => {
			try {
				if (!fs.existsSync(tempOutputPath)) {
					console.error(`Error: Temporary file not found: ${tempOutputPath}`);
					return;
				}
				
				// The size of the temporary file (compressed)
				const outputSize = fs.statSync(tempOutputPath).size;
				
				// Calculating the compression percentage
				const ratio = ((inputSize - outputSize) / inputSize) * 100;
				
				// We delete the final file, if it exists and differs from temp.
				if (fs.existsSync(finalOutputPath) && finalOutputPath !== tempOutputPath) {
					fs.unlinkSync(finalOutputPath);
				}
				
				// Delete the source file if it exists and differs from the final one.
				if (fs.existsSync(inputPath) && inputPath !== finalOutputPath) {
					fs.unlinkSync(inputPath);
				}
				
				// Rename the temporary file to the final one
				fs.renameSync(tempOutputPath, finalOutputPath);
				
				console.log(`✅ ${file} → ${outputFileName} compressed and replaced`);
				console.log(`   The original size: ${(inputSize / 1024).toFixed(2)} KB`);
				console.log(`   New size: ${(outputSize / 1024).toFixed(2)} KB`);
				console.log(`   Compression: ${ratio.toFixed(2)}%`);
			} catch (err) {
				console.error(`File processing error:`, err);
			}
		})
		.on('error', err => {
			console.error(`❌ Compression error ${file}:`, err.message);
			if (fs.existsSync(tempOutputPath)) {
				fs.unlinkSync(tempOutputPath);
			}
		})
		.save(tempOutputPath);
});
