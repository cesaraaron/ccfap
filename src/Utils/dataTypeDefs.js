export const dataTypeDefinitions = () => {
  return {
    // override `date` to handle custom date format `dd/mm/yyyy`
    date: {
      baseDataType: "date",
      extendsDataType: "date",
      valueParser: (params) => {
        if (params.newValue == null) {
          return null
        }
        // convert from `dd/mm/yyyy`
        const dateParts = params.newValue.split("/")
        return dateParts.length === 3
          ? new Date(
              parseInt(dateParts[2]),
              parseInt(dateParts[1]) - 1,
              parseInt(dateParts[0]),
            )
          : null
      },
      valueFormatter: (params) => {
        // convert to `dd/mm/yyyy`
        return params.value == null
          ? ""
          : // eslint-disable-next-line no-undef
            `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear}`
      },
    },
  }
}
