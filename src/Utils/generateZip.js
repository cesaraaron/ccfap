import JSZip from "jszip"
import { saveAs } from "file-saver"

/**
 * @param {Object<string, Blob>} blobs
 * @param {string} dateString
 */
export const generateZip = (blobs, appData) => {
  const zip = new JSZip()

  const depositosDate =
    appData.depositos[0]?.fecha
      ?.replace(/\/\d{4}$/, "")
      ?.replaceAll("/", "-") ?? ""
  const cambioscxpDate =
    appData.cambioscxp[0]?.fecha
      ?.replace(/\/\d{4}$/, "")
      ?.replaceAll("/", "-") ?? ""
  const cambioscxcDate =
    appData.cambioscxc[0]?.fecha
      ?.replace(/\/\d{4}$/, "")
      ?.replaceAll("/", "-") ?? ""
  const liquidacionesDate =
    appData.liquidaciones[0]?.fecha
      ?.replace(/\/\d{4}$/, "")
      ?.replaceAll("/", "-") ?? ""
  const salidasDate =
    appData.salidas[0]?.fecha?.replace(/\/\d{4}$/, "")?.replaceAll("/", "-") ??
    ""
  const trasladosDate =
    appData.traslados[0]?.fecha
      ?.replace(/\/\d{4}$/, "")
      ?.replaceAll("/", "-") ?? ""

  if (blobs.depositos !== undefined) {
    zip.file(`Depositos bancarios ${depositosDate}.xlsx`, blobs.depositos)
  }

  if (blobs.cambioscxp !== undefined) {
    zip.file(`CambiosCXP ${cambioscxpDate}.xlsx`, blobs.cambioscxp)
  }

  if (blobs.cambioscxc !== undefined) {
    zip.file(`CambiosCXC ${cambioscxcDate}.xlsx`, blobs.cambioscxc)
  }
  if (blobs.liquidaciones !== undefined) {
    zip.file(
      `Liquidaciones bancarias ${liquidacionesDate}.xlsx`,
      blobs.liquidaciones,
    )
  }
  if (blobs.salidas !== undefined) {
    zip.file(`Transferencias bancarias ${salidasDate}.xlsx`, blobs.salidas)
  }
  if (blobs.traslados !== undefined) {
    zip.file(`Traslados bancarios ${trasladosDate}.xlsx`, blobs.traslados)
  }

  zip.generateAsync({ type: "blob" }).then((content) => {
    saveAs(
      content,
      `Movimientos ${depositosDate || cambioscxpDate || cambioscxcDate || liquidacionesDate || salidasDate || trasladosDate}.zip`,
    )
  })
}
