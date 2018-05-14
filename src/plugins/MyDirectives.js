// import Vue from 'vue'

const MyDirectives = {
  install(Vue, options) {
    Vue.directive("focus", {
      inserted: function(element, binding) {
        element.focus();
        console.log("xxx", element, binding);
      }
    });

    // Vue.mixin({
    //   mounted: function() {
    //     //console.log(this.$el);
    //   }
    // });

    Vue.directive("validate", {
      inserted: function(element, binding) {
        const RULES = {
          REQUIRED: "required",
          NUMBER: "number",
          EMAIL: "email",
          TEXT: "text"
        };

        let validationRules = binding.value

        let isRequired = binding.arg === RULES.REQUIRED
        
        // element.addEventListener("input", event => {
        //   //console.log(event, event.target.value, "value");
        //   let value = event.target.value
        //   if (isRequired && !value.length) {
        //       console.log('Field is required', event.target.name)
        //   }
        // });
        element.addEventListener('submit', event => {
            event.preventDefault()
            console.log('event', event, validationRules)
            Object.keys(validationRules).forEach(key => {
               if (validationRules[key].indexOf(RULES.REQUIRED) > -1) {
                   let message = document.createElement('div')
                   message.innerHTML = `This field ${key.toUpperCase()} is required`
                   element.appendChild(message)
               }
            });
            
        })
      }
    });
  }
};

export default MyDirectives;
