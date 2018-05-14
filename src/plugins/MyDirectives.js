// import Vue from 'vue'
import { throws } from "assert"

const RULES = {
    REQUIRED: "required",
    NUMBER: "number",
    EMAIL: "email",
    TEXT: "text"
  };

  const MESSAGES_CLASSNAME = "validator-messages";

const removeMessageErrorElement = (element) => {
    let oldMessageElement = element.querySelector(
        `#${MESSAGES_CLASSNAME}`
      );
      if (oldMessageElement) {
        oldMessageElement.remove();
      }
}


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
        

        let validationRules = binding.value;

        let isRequired = binding.arg === RULES.REQUIRED;

        // element.addEventListener("input", event => {
        //   //console.log(event, event.target.value, "value");
        //   let value = event.target.value
        //   if (isRequired && !value.length) {
        //       console.log('Field is required', event.target.name)
        //   }
        // });
        element.addEventListener("submit", event => {
          event.preventDefault();

          console.log("event", event, validationRules);
          Object.keys(validationRules).forEach(key => {
            let input = element.querySelector(`#${key}`);

            if (!input) {
              throw new Error(
                "Element for validation rule ${key} not found!"
              );
            }

            if (validationRules[key].indexOf(RULES.REQUIRED) > -1 && !input.value.length) {
              let message = document.createElement("div");
              message.id = MESSAGES_CLASSNAME;
              
              removeMessageErrorElement(element)

              message.innerHTML = `This field ${key.toUpperCase()} is required`;
              element.appendChild(message);
            } else {
                removeMessageErrorElement(element)
            }
          });
        });
      }
    });
  }
};

export default MyDirectives;
