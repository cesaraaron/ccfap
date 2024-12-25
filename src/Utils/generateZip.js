import JSZip from "jszip"
import { saveAs } from "file-saver"

/**
 * @param {Object<string, Blob>} blobs
 */
export const generateZip = (blobs) => {
  const zip = new JSZip()

  if (blobs.depositos !== undefined) {
    zip.file("Depositos.xlsx", blobs.depositos)
  }

  if (blobs.cambioscxp !== undefined) {
    zip.file("CambiosCXP.xlsx", blobs.cambioscxp)
  }

  if (blobs.cambioscxc !== undefined) {
    zip.file("CambiosCXC.xlsx", blobs.cambioscxc)
  }
  if (blobs.liquidaciones !== undefined) {
    zip.file("Liquidaciones.xlsx", blobs.liquidaciones)
  }
  if (blobs.salidas !== undefined) {
    zip.file("Salidas.xlsx", blobs.salidas)
  }
  if (blobs.traslados !== undefined) {
    zip.file("Traslados.xlsx", blobs.traslados)
  }

  zip.generateAsync({ type: "blob" }).then((content) => {
    saveAs(content, "movimientos.zip")
  })
}
