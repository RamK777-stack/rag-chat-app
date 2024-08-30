import Papa from 'papaparse';

export async function processCSV(arrayBuffer: ArrayBuffer): Promise<string[]> {
  const csvString = new TextDecoder().decode(arrayBuffer);
  return new Promise((resolve, reject) => {
    Papa.parse(csvString, {
      complete: (results) => {
        console.log('results', results)
        const processedData = results.data;
        resolve(processedData);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}