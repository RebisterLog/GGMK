import fs = require("fs");
import axios from "axios";
import cheerio from "cheerio";
import * as http from 'http';

function downloadPNGImage(url: string, outputPath: string): void {
    const file = fs.createWriteStream(outputPath);
  
      http.get(url, (response) => {
          response.pipe(file);
  
          file.on('finish', () => {
          file.close();
          });
      }).on('error', (err) => {
          fs.unlink(outputPath, () => {
              console.error(`Error while download: ${err.message}`);
          });
      });
}
  
export class Parser {
    public readonly url = 'http://uoggmk.by/%D1%80%D0%B0%D1%81%D0%BF%D0%B8%D1%81%D0%B0%D0%BD%D0%B8%D0%B5/';
    public readonly headers = {
        "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 OPR/98.0.0.0 (Edition Yx GX)"
    };
    public Axio = axios.create();

    public imagesUrls: string[] = [];
    public imagePaths: string[] = [];
    
    public GetImages() {
        return this.imagesUrls;
    }

    public ParseUrls() {
        this.Axio.get(this.url).then(
            response => {
                const html = response.data;
                const parsedInfo = cheerio.load(html);
                const table = parsedInfo("img");

                this.imagesUrls[0] = table[5].attribs["src"];
                this.imagesUrls[1] = table[6].attribs["src"];

                return this.imagesUrls;
            }
        )
    }

    public DownloadImages() {
        this.imagePaths = [];
        
        this.imagesUrls.forEach(async (url, index) => {
            const path = `./Temp/schedule${index}.png`;
            downloadPNGImage(url, path);
            this.imagePaths.push(path);
        });
    }
}