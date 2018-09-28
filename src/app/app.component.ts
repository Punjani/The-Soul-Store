import { Component } from '@angular/core';
import { OnInit } from "@angular/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'imageMaps';
  public onload: boolean;
  public left: boolean;
  public right: boolean;
  public isAdded: boolean;
  public selectedElement: any;
  public elements: Array<Elements> = [];
  public model: Elements;
  public currentEvent:any;
  public items = ['rect','circle'];
  public message: string;
  AppComponent(){   
     
  }

  ngOnInit(){
    this.onload = true;
    this.left = false;
    this.right = false;
    this.isAdded = false;
    let value = new Elements();
    value.type = 'Default';
    value.coords = '0,0,50,50';       
    this.elements.push(value);
    this.model = new Elements();
  }

  selectedElementTrigger(type: string){
    this.onload = false;
    this.left = true;
    this.right = false;
    this.isAdded = false;
    this.selectedElement = type;
  }

  rightClick(event){
    this.currentEvent = event;
    this.onload = false;
    this.left = false;
    this.right = true;
    this.isAdded = false;
    let x = event.offsetX;
    let y = event.offsetY;
    this.model.type = 'Value';
    this.model.coords = (x-25)+','+(y-25)+','+(x+25)+','+(y+25);
    this.model.shape = this.items[0];
    return false;
  }

  addElement(){
    this.message = "";
    let addingValue = new Elements();
    addingValue.type = this.model.type;
    addingValue.coords = this.model.coords;
    addingValue.shape = this.model.shape;
    if(addingValue.type != null && addingValue.coords != null &&
    addingValue.type != "" && addingValue.coords != ""){
      this.elements.push(addingValue);
      this.onload = false;
      this.left = false;
      this.right = false;
      this.isAdded = true;
      console.log(this.elements);
    } else {
      this.message = "Please input value information in Name and Coordinates";      
    }
    
  }

  update(shape){
    let x = this.currentEvent.offsetX;
    let y = this.currentEvent.offsetY;
    this.model.shape = shape;
    if(shape === 'circle'){            
      this.model.coords = x+','+y+','+50;
    } else {    
      this.model.coords = (x-25)+','+(y-25)+','+(x+25)+','+(y+25);
    }
  }
}

export class Elements{  
  public type: string;
  public coords: string;
  public shape="rect";
}
