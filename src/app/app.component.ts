import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'wayforwordAgular';
  total:any
  value_a:any = "";
  value_b:any = "";
  selectedMethod:any = "";
  isMethod:boolean = false;
  
  opratorMethods  = {
    "-": (a, b) => parseInt(a) - parseInt(b),
    "+": (a, b) => parseInt(a) + parseInt(b),
    "*": (a, b) => parseInt(a) * parseInt(b),
    "/": (a, b) => parseInt(a) / parseInt(b),
  }

  selectN(value:string, type:string){

    if(!this.isMethod){
      this.value_a += value
      this.isMethod = false;
    }else{
      this.value_b += value
    }

  }

  equalTo(operator:string, value:string){

    if(this.selectedMethod && this.value_a && this.value_b){
      this.total = this.opratorMethods[this.selectedMethod](this.value_a, this.value_b);
      this.value_a = ""
      this.value_b = "";
      this.isMethod = false;
      this.selectedMethod = "";
    }
  }

  callMethod(method:string, value:string){
      this.selectedMethod = method
      let m = this.opratorMethods[method];

      if(this.value_a && this.value_b){
        this.total = this.total? parseInt(this.total) + m(this.value_a, this.value_b) : m(this.value_a, this.value_b)
        this.value_a = "";
        this.value_b = "";
        this.isMethod = false;
      }else if(this.value_a && !this.value_b){        
        this.isMethod = true;
      }else if(!this.value_a && !this.value_b && this.total > 0 ){
        this.value_a = this.total;
        this.isMethod = true;
        this.total = 0
      }else if(!this.value_a && !this.value_b && (this.total <= 0 || !this.total)){
        if(method === '-' && this.value_a.indexOf('-') === -1){
          this.value_a = this.total && this.total != 0? this.total : method + this.value_a;
          this.selectedMethod = "";
        }
      }
  }

  reset(){
    this.selectedMethod = "";
    this.total = 0
    this.value_a = "";
    this.value_b = "";
    this.isMethod = false;
  }
}
