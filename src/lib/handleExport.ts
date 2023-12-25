import {utils, writeFile} from "xlsx"

export const handleExport = async(headings: string[], data: any[], title: string) => {
    const wb = utils.book_new()
    const ws = utils.json_to_sheet([])
    utils.sheet_add_aoa(ws, [headings]);
    utils.sheet_add_json(ws, data, {origin: "A2", skipHeader: true})
    utils.book_append_sheet(wb, ws, `CTTI Enquiry List`)
    writeFile(wb, `${title}.xlsx`)
}