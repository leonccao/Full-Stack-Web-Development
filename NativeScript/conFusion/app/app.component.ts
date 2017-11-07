import { Component, OnInit, OnDestroy } from "@angular/core";
import { PlatformService } from './services/platform.service'; 

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})

export class AppComponent implements OnInit, OnDestroy { 
    
      constructor(private platformService: PlatformService) { } 
      
      ngOnInit() { 
        this.platformService.printPlatformInfo(); 
        this.platformService.startMonitoringNetwork()
        .subscribe((message: string) => {
          console.log(message); 
          
        });
        
        
      } 
      
      ngOnDestroy() { 
        
        this.platformService.stopMonitoringNetwork(); 
        
      } 
      
    }