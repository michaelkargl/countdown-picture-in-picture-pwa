import Cors from "cors"

const cors = Cors()

// Consumed by Gatsby
// noinspection JSUnusedGlobalSymbols
export default async function corsHandler(
  req: Cors.CorsRequest,
  res: any,
): Promise<void> {
  // Run Cors middleware and handle errors.
  await new Promise((resolve, reject) => {
    cors(req, res, result => {
      if (result instanceof Error) {
        return reject(result)
      }
      resolve(result)
    })
  })
}
