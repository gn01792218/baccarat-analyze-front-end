export default function useFormData() {
    //尚未完成
  function getFormData(object:Object, formData = new FormData, parentKey?:string) {
    Object.entries(object).forEach(([key, value])=>{
        if (Object.prototype.hasOwnProperty.call(object, key)) {
          formData.append(key, value);
        }
    })
    return formData;
  }
  return {
    //method
    getFormData,
  };
}
