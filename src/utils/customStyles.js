
export const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    boxShadow: "none",
    border: "none",
    backgroundColor: "#fff",
    textTransform: "capitalize",
    padding:"0",
    minHeight:"37px",
    
  }),

  option: (provided) => ({
    ...provided,
    color: "#333",
    textTransform: "capitalize",
   
  }),
  menuList: (base) => ({
    ...base,
    "::-webkit-scrollbar": {
      width: "1px",
      height: "0px",
      padding: "0",
      
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
    color: "#7F7F7F",
    fontSize: '0.8rem',
    lineHeight:' 1.25rem',
   
   
  }),
 
  input: (provided) => ({
    ...provided,
    color: "#808080",
   
    

  }),
  
  indicatorSeparator: (base) => ({
    ...base,
    display: "none",
     padding: "0", 
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
    padding:"0",
  }),
  input: (provided) => ({
    ...provided,
    color: "#808080",

  }),
  menu: ({ width, ...css }) => ({
    ...css,
    width: "200px",
    minWidth: "100%",
    
}),

}
  export const statusDataSelecter={
    
     
      control: (provided, state) => ({
        ...provided,
        boxShadow: "none",
        border: "none",
        backgroundColor:' #EBEBF0',
        textTransform: "capitalize",
        padding:"0",
        minHeight:"30px",
        
      }),
    
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '' : '#FFF',
        color: state.isSelected ? '#FFF' : '#000',
        padding: 10,
      }),
      input: (provided) => ({
        ...provided,
        caretColor: 'transparent',
        pointerEvents: 'none', 
      }),
      // menuList: (base) => ({
      //   ...base,
      //   "::-webkit-scrollbar": {
      //     width: "1px",
      //     height: "0px",
      //     padding: "0",
          
      //   },
      //   "::-webkit-scrollbar-track": {
      //     background: "#f1f1f1",
      //   },
      //   "::-webkit-scrollbar-thumb": {
      //     background: "#888",
      //   },
      //   "::-webkit-scrollbar-thumb:hover": {
      //     background: "#555",
      //   },
      // }),
      // singleValue: (provided) => ({
      //   ...provided,
      //   color: "#3A3A3A",
       
      // }),
      // placeholder: (provided) => ({
      //   ...provided,
      //   color: "#7F7F7F",
      //   fontSize: '0.875rem',
      //   lineHeight:' 1.25rem',
       
       
      // }),
     
      // input: (provided) => ({
      //   ...provided,
      //   color: "#808080",
       
        
    
      // }),
      
      indicatorSeparator: (base) => ({
        ...base,
        display: "none",
         padding: "0", 
      }),
    
    

  }
  export const customSelectResumeStyles = {
    control: (provided, state) => ({
      ...provided,
      boxShadow: "none",
      border: "none",
      backgroundColor: "#FFF2F2",
      textTransform: "capitalize",
  gap:"20px",
      padding:"0",
      minHeight:"37px",
      
    }),
 
    option: (provided) => ({
      ...provided,
      color: "#333",
      textTransform: "capitalize",
     
    }),
    menuList: (base) => ({
      ...base,
      "::-webkit-scrollbar": {
        width: "1px",
        height: "0px",
        padding: "0",
        
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
      color: "#000000",
     
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#000000",
      fontSize: '0.8rem',
      lineHeight:' 1.25rem',

     
     
    }),
   
    input: (provided) => ({
      ...provided,
      color: "#808080",
      caretColor: 'transparent',
        pointerEvents: 'none',
     
      
  
    }),
    
    indicatorSeparator: (base) => ({
      ...base,
      display: "none",
       padding: "0", 
    }),
  
  }
  export const customSelectTransferStyles = {
    control: (provided, state) => ({
      ...provided,
      boxShadow: "none",
      border: "none",
      backgroundColor: " #181C3A",
      textTransform: "capitalize",
      padding:"0",
      minHeight:"37px",
      gap:"20px",
      color:"#FFFFFF",
      
    }),
  
    option: (provided) => ({
      ...provided,
      color: "#333",
      textTransform: "capitalize",
     
    }),
    menuList: (base) => ({
      ...base,
      "::-webkit-scrollbar": {
        width: "1px",
        height: "0px",
        padding: "0",
        
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
      color: "#FFFFFF",
     
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#FFFFFF",
      fontSize: '0.8rem',
      lineHeight:' 1.25rem',
     
     
    }),
   
    input: (provided) => ({
      ...provided,
      color: "#FFFFFF",
      caretColor: 'transparent',
        pointerEvents: 'none',
     
      
  
    }),
    
    indicatorSeparator: (base) => ({
      ...base,
      display: "none",
       padding: "0", 
       color:""
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#FF0000', 
      
    }),
  
  }