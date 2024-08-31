
export const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    boxShadow: "none",
    border: "none",
    backgroundColor: "#fff",
    textTransform: "capitalize",
    
  }),

  option: (provided) => ({
    ...provided,
    color: "#333",
    textTransform: "capitalize"
  }),
  menuList: (base) => ({
    ...base,
    "::-webkit-scrollbar": {
      width: "1px",
      height: "0px",
    },
    "::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },
    "::-webkit-scrollbar-thumb": {
      background: "#888",
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#3A3A3A",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#808080",
  }),
  input: (provided) => ({
    ...provided,
    color: "#808080",

  }),
  
  indicatorSeparator: (base) => ({
    ...base,
    display: "none",
  }),

}

const dot = (color = "transparent") => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    backgroundColor: color,
    borderRadius: 2,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 16,
    width: 20,
  },
})

export const colourStyles = {
  control: (provided, state) => ({
    ...provided,
    boxShadow: "none",
    border: "none",
    backgroundColor: "#fff",
    textTransform: "capitalize",
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    
    return {
      ...styles,
      ...dot(data.value),
    }
  },
  input: (styles) => ({ ...styles, ...dot() }),
  placeholder: (styles) => ({ ...styles, ...dot("#cc") }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.value) }),
}


export const customDropSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    boxShadow: "none",
    border: "none",
    backgroundColor: "#fff",
    textTransform: "capitalize",
    
  }),

  option: (provided) => ({
    ...provided,
    color: "#333",
  }),
  menuList: (base) => ({
    ...base,
    "::-webkit-scrollbar": {
      width: "1px",
      height: "0px",
    },
    "::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },
    "::-webkit-scrollbar-thumb": {
      background: "#888",
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#808080",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#808080",
  }),
  input: (provided) => ({
    ...provided,
    color: "#808080",

  }),
  menu: ({ width, ...css }) => ({
    ...css,
    width: "310px",
    minWidth: "100%",
}),

}