var NoUserPage = {
  template: "#no-user-page",
  data: function(){
    return {

    }
  }
};

var RequestsNewPage = {
  template: "#requests-new-page",
  data: function() {
    return {
      nanny_id: "",
      pay_rate: "",
      number_of_children: "",
      start_time: "",
      end_time: "",
      location: "",
      errors:[]
    };
  },
  methods: {
    submit: function() {
      var params = {
        nanny_id: this.nanny_id,
        pay_rate: this.pay_rate,
        number_of_children: this.number_of_children,
        start_time: this.start_time,
        end_time: this.end_time,
        location: this.location
      };                           
      axios
      .post("/requests", params)
      .then(function(response){
        router.push("/profile");
      })
      .catch(
        function(error) {
          if (error.response.status === 401){
            router.push("/login");
          } else if (error.response.status === 422){
            this.errors = error.response.data.errors;
          } else {
            router.push("/");
          }
        }.bind(this)
      );
    }
  }
};

var RequestsShowPage = {
  template: "#requests-show-page",
  data: function () {
    return {
      parent_id: "", 
      nanny_id: "",
      pay_rate: "",
      number_of_children:"", 
      start_time:"", 
      end_time: "",
      location: "",
      errors: []
    };
  },
  created: function() {
    axios.get("requests/" + this.$route.params.id)
      .then(function(response) {
        this.request = response.data;
      }.bind(this));
  }
}
 
var RequestsEditPage = {
  template: "#request-edit-page",
  data: function() {
    return {
      parent_id: "", 
      nanny_id: "",
      pay_rate: "",
      number_of_children:"", 
      start_time:"", 
      end_time: "",
      location: "",
      errors: []
    };
  },
  created: function() {
    axios
      .get("/requests/" + this.$route.params.id)
      .then(function(response) {
        console.log(response.data);
        var request = response.data;
        this.parent_id = request.parent_id
        this.nanny_id = request.nanny_id
        this.pay_rate = request.pay_rate
        this.number_of_children = request.number_of_children
        this.start_time = request.start_time
        this.end_time = request.end_time
        this.location = request.location  
      }.bind(this));
  },
  methods: {
    submit: function() {
      var params = {
        parent_id: this.parent_id, 
        nanny_id: this.nanny_id,
        pay_rate: this.pay_rate,
        number_of_children: this.number_of_children,
        start_time: this.start_time,
        end_time: this.end_time,
        location: this.location
      };
      axios 
      .patch("/requests/" + this.$route.params.id,params)
      .then(function(response) {
        router.push("/profile/");
      }.bind(this))
      .catch(
        function(error) {
          this.errors = error.response.data.errors;
          router.push("/login");
        }.bind(this));
    }
  }
};

var RequestsUpdatePage = {
  created: function() {
    axios.accept("/requests/" + this.$route.params.id)
    .then(function(response) {
      router.push("/")
    });
  }
}

var UsersNannyPage  = {
  template: "#users-nanny-page",
  data: function() {
    return {
       nannies: [],
       // users:[]
      // nanny: true,
      // currentUser: {formatted: {}}
    };
  },
  created: function() {
    axios.get("/users/:id/nannies")
      .then(function(response) {
        this.nannies = response.data;
        console.log(this.nannies);
      }.bind(this));
  },
  methods: {
    setCurrentUser: function(nanny) {
      this.currentUser = nanny;
    }
  },
  computed: {}
};


var UsersShowPage = {
  template: "#users-show-page",
  data: function() {
    return {
      user: {
        first_name: "",
        last_name:"",
        email:"",
        gender:"",
        city:"",
        state:"",
        zipCode:"",
        imageUrl:"",
        errors:[]   
      }
    }
  },
  created: function() {
    axios.get("/users/ + this.$route.params.id" )
        .then(function(response) {
          this.user = response.data;
        }.bind(this));
  }
};


var UsersEditPage = {
    template: "#users-edit-page",
    data: function () {
      return {
      first_name: "",
      last_name:"",
      email:"",
      gender:"",
      city:"",
      state:"",
      zipCode:"",
      // imageUrl:"",
      password:"",
      password_confirmation: "",
      errors:[]    
      };
    },
    created: function () {
      axios 
      .get("/users/" + this.$route.params.id)
      .then(function(response) {
          console.log(response.data);
          var user = response.data;
          this.first_name = user.first_name
          this.last_name = user.last_name
          this.email = user.email
          this.gender = user.gender
          this.city = user.city
          this.state = user.state
          this.zipCode = user.zipCode
          this.image_url = user.image_url
          this.password = user.password
          this.password_confirmation = user.passwordConfirmation
        }.bind(this));
    }, 

methods: {
  submit: function () {
    var params = {
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      gender: this.gender, 
      city: this.city, 
      state: this.state, 
      zipCode: this.zipCode, 
      image_url: this.image_url,
      password: this.password, 
      password_confirmation:this.password_confirmation 
    };

    axios 
      .patch("/users/" + this.$route.params.id, params).then(function(response) {
        router.push("/profile");
      }.bind(this))
      .catch(
        function(error) {
          this.errors = error.response.data.errors;
          router.push("/profile");
        }.bind(this))
      }
    },

    uploadFile: function(event) {
      if (event.target.files.length > 0) {
        var formData = new FormData();
        formData.append("image", event.target.files[0]);

        axios
          .post("http://localhost:3000/users/images", formData)
          .then(function(response) {
            console.log(response);
            event.target.value = "";
          }.bind(this));
      }
    }
  };
  


var UserProfilePage = {
  template: "#user-profile-page",
  data: function() {
    return {
      user: {
        first_name: "",
        last_name: "",
        email: "",
        gender: "",
        city: "",
        state: "",
        zipCode: "",
        imageUrl: "",
        errors: []
      },
      nanny_pending_requests: [{}],
      nanny_accepted_requests: [{}],
      parent_pending_requests: [{}],
      parent_accepted_requests: [{}],
      nanny_id: "",
      pay_rate: "",
      number_of_children:"",
      start_time:"",
      end_time:"",
      location:"",
      errors:[]
    };
  },
  created: function() {
    axios.get("/profile").then(function(response) {
      this.user = response.data["user"];
      this.nanny_pending_requests = response.data["nanny_pending_requests"];
      this.nanny_accepted_requests = response.data["nanny_accepted_requests"];
      this.parent_pending_requests = response.data["parent_pending_requests"];
      this.parent_accepted_requests = response.data["parent_accepted_requests"];
    }.bind(this));
  },
  methods: {
    nannyAccept: function(request) {
      axios.patch("/requests/" + request.id + "/accept")
      .then(function(response) {
        this.nanny_pending_requests = response.data["nanny_pending_requests"];
        this.nanny_accepted_requests = response.data["nanny_accepted_requests"];
      }.bind(this));
    },
    nannyDecline: function(request) {
      axios.delete("/requests/" + request.id + "/decline")
      .then(function(response) {
        this.nanny_declined_requests = response.data["nanny_declined_requests"];
      }.bind(this));
    },
    
    parentDestroy: function(request) {
      axios.delete("/requests/" + request.id)
      .then(function(response) {
        router.push("/profile");  
      });
    }
  }
};

var SignupPage = {
  template: '#signup-page',
  data: function() {
    return {
            first_name: "" ,
            last_name: "",
            email: "" ,
            gender: "" ,
            age: "",
            city: "" , 
            state: "" , 
            zipCode: "" , 
            password: "" , 
            password_confirmation:"",
            errors: []
    };
  },
  created: function() {},
  methods: {
    uploadFile: function(event) {
      if (event.target.files.length > 0) {
        var formData = new FormData();
        formData.append("first_name", this.first_name);
        formData.append("last_name", this.last_name);
        formData.append("email", this.email);
        formData.append("gender", this.gender);
        formData.append("city", this.city);
        formData.append("state", this.state);
        formData.append("zipCode", this.zipCode);
        formData.append("password", this.password);
        formData.append("password_confirmation", this.password_confirmation);
        formData.append("image", event.target.files[0]);

        axios
        .post("/users", formData)
        .then(function(response) {
          console.log("test");
          this.first_name = "";
          this.last_name = "";
          this.email = "";
          this.gender = "";
          this.city = "";
          this.state = "";
          this.zipCode = "";
          this.password = "";
          this.password_confirmation = "";
          event.target.value = "";
        }.bind(this));
      }
    },
    submit:function() {
      router.push("/login");
    }
  },
  computed: {}
};

var LoginPage = {
  template: "#login-page",
  data: function () {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        auth: { email: this.email, password:this.password}
      };
      axios
      .post("/user_token", params)
      .then(function(response) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
        localStorage.setItem("jwt", response.data.jwt);
        router.push("/profile");
      })
      .catch(
        function(error){
          this.errors = ["Invalid email or password"];
          this.email = "";
          this.password = "";
        }.bind(this)
      );
    }
  }
};

var LogoutPage = {
  created: function() {
    axios.defaults.headers.common["Authorization"] = undefined;
    localStorage.removeItem("jwt");
    router.push("/#/");
  }
};


var router = new VueRouter({
  routes: [

  { path: "/", component: NoUserPage },

  { path: "/profile", component: UserProfilePage },

  { path: "/users/nannies", component: UsersNannyPage },

  { path: "/users/:id/edit", component: UsersEditPage },
  { path: "/requests/new", component: RequestsNewPage },
  { path: "/requests/:id", component: RequestsShowPage },
  { path: '/requests/:id/edit', component: RequestsEditPage },
  

  { path: "/signup", component:SignupPage },
  { path: "/login", component:LoginPage },
  { path: "/logout", component:LogoutPage },

  ],


  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});



var app = new Vue({
  el: "#vue-app",
  router: router,
  data: function() {
    return{
      menuZipora:false
    }
  },
  created: function() {
    var jwt = localStorage.getItem("jwt");
    if (jwt) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
    }
  }
});
