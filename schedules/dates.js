// Code to creates a schedule for GEOG370
// First enter the variables related to feriados y el comienzo de classes
// Indica si es una clase de Lunes y Miercoles of de Martes y Jueves. 
// El codigo crea un objeto global llamado 'daObj' que puedes agarrar como JSON y crear luego la variable schedule en el scheduls.js

// To do make color codes and change dates of titles, like for example from Spring to Fall and that kind of thing. 
var UNCdates = {
    year: 2023,
    semester: "Fall",
    days: "Mon-Wed",// or "Tue-Thu"
    time: '2:30pm-3:45pm',
    officeHours:"Mondays from 4pm to 6pm",
    feriados:['Mon Sept 4', 'Tue Sept 5', 'Mon Sept 25', 'Thu Oct 19' , 'Fri Oct 20', 'Wed Nov 22' , 'Thu Nov 23' , 'Fri Nov 24' ],
    firstMonday: 'Mon Aug 21 2023',
    firstDayOfClass: 'Mon Aug 21 2023',
    classesEnd: 'Wed Dec 6 2023',
    conflict:0,
    alert: 'on',
    hw:{
        'hw1':11,
        'hw2':7,
        'hw3':5,
        'hw4':5,
        'hw5':11,
        'hw6pt1':5,
        'hw6pt2':7,
        'hw7': 4, 
        'hw8':24,// spring break
        'hw9':7,
        'hw10':11,
        },
        topics:{
            day1:'Introduction to class',
            day2:'Introduction to data types',  
            day3:'How we model the world',
            day4:'Sharing our maps pt1 / Github',
            day5:'Sharing our maps pt2 / GPS',
            day6:'Projections',
            day7:'Projections and Georeferencing',
            day8:'Exercise: georeference UNC maps and create tiles',
            day9:'Test 1',
            day10: 'Webmaps',
            day11: 'Tables',
            day12: 'Choropleths',// check date
            day13: 'Classification Schemes and Ratios',
            day14: 'Apply classification and ratios to your data',
            day15: 'Share your maps / RECAP',
            day16: 'Test 2',
            day17: 'Cartography',//
            day18: 'Vector Spatial Analysis',
            day19: 'Vector Spatial Analysis Practical',
            day20: 'Introduction to Rasters and to GEE',
            day21: 'Share your maps / Answer GEE questions',
            day22: 'Intro to remote sensing pt2',
            day23: 'Raster Spatial Analysis',
            day24: 'Test 3',
            day25: 'Work on remote sensing presentation',
            day26: 'Remote Sensing Presentation',
            day27: 'Remote Sensing Presentation',
            day28: 'Topography and elevation models',
            day29: 'Discuss Test 3 / RECAP',
            FinalExam: 'FINAL EXAM'
        },
    addDatesToHTML(){
        this.sumDates();
        this.writeDates()
    },
    sumDates(){
            var t = new Date(this.firstMonday)
            Object.keys(this.hw).forEach((e,i)=>{
                    t.setDate(t.getDate()+ this.hw[e])
                // console.log(t.toDateString())
                this.hw[e] = t.toDateString() //left it as date 
                this.verifyDates(t,e)
                })
    } ,  
    writeDates(){
        var tagDates = document.getElementsByClassName('date')
        for (var i=0; i<tagDates.length; i++){
        tagDates[i].innerHTML = (this.hw[tagDates[i].innerHTML])  + ' at 11:55 pm' // I should add an error control here in case there is no key for the date
    }
    },

    beforeDate(){ // i will only apply a one week before HW rule in the future I should try to code it similar to assignScheduleDate so I can add different dates if needed. 
        var tagDates = document.getElementsByClassName('before')
        for (var i=0; i<tagDates.length; i++){
            var date = new Date(Date.parse(this.hw[tagDates[i].innerHTML]) - (1000*60*60*24*6))
            console.log((date.toDateString()))
            tagDates[i].innerHTML = (date.toDateString()) // I should add an error control here in case there is no key for the date
    }

    },
    verifyDates(hwDate, daHW){
        if (hwDate > new Date(this.classesEnd)) {alert(daHW + " is after the last day")}
        this.feriados.forEach((e)=>
            
        {   
            feriado = new Date(e + ' ' + this.year);       
            if (feriado.toDateString() == hwDate.toDateString()) {
                if (this.alert == 'on'){alert(daHW + " has a conflict on " + feriado.toDateString())}
                return this.conflict = 1;
                }     
                
            })
        },

    fromDayToNextDay(daDate) {
        if(this.days ==  "Mon-Wed"){
        if (daDate.getDay() == 1){
            daDate.setDate(daDate.getDate()+ 2)}
            else {
            daDate.setDate(daDate.getDate()+ 5)}}
        
        if(this.days ==  "Tue-Thu"){
        if (daDate.getDay() == 2){
        daDate.setDate(daDate.getDate()+ 2)}
        else {
        daDate.setDate(daDate.getDate()+ 5)}
        }
    },


    makeTable(daTopic, daDateString)
        { 
        // daTable = document.getElementById(tableID)
        // console.log(daTable)    
        const tr = document.createElement('tr');
        const thDay = document.createElement('td');
        const thActivity = document.createElement('td');
        thDay.innerHTML = daDateString
        tr.appendChild(thDay)
        thActivity.innerHTML = daTopic;
        daObj[daDateString] = daTopic;
        tr.appendChild(thActivity);
        daTable.appendChild(tr)},

    makeSchedule(tableID){
        daObj = { }
        daTable = document.getElementById(tableID)
        var daDate = new Date(this.firstDayOfClass)
        Object.keys(this.topics).forEach((e,i)=>{
        if(e == 'FinalExam'){
            this.makeTable("Final Exam", 'Check official calendar')
            return}
        // console.log(i)
        if(i>0){this.fromDayToNextDay(daDate)}
        this.verifyDates(daDate,e)
        while (this.conflict == 1){ 
            // console.log('conflict')
            this.conflict = 0;
            var daTopic = 'No Classes'
            this.makeTable(daTopic, daDate.toDateString())
            this.fromDayToNextDay(daDate)
            this.verifyDates(daDate,e)
        }
        if (this.conflict == 0){
            this.makeTable(this.topics[e], daDate.toDateString())
        }
        
    })
    alert("the object 'daObj' has been created")
    console.log(daObj)
    },
    assignScheduleDate(schedule) { // requires a JSON with the schedule verified. 
        var sch = document.getElementsByClassName('schedule')
        for (var i=0;i<sch.length;i++){
            // var e = sch[i].innerHTML.split('{').filter(e => e.includes('}'))[0].split('}')[0]
            var words = sch[i].innerHTML.split('{')
            console.log(words.toString())
            for (var j=0; j < words.length; j++)
            {
                if (words[j].match('}') != null){
                    
                    var daKey = words[j].split('}')[0]
                    Object.keys(schedule).forEach((e)=>{
                        if (schedule[e]==daKey) { 
                            var words2 = words[j].split('}')
                            words2[0] = e
                            words[j] = words2.join(' ')
                            sch[i].innerHTML = words.join(' ')
                        }

                    })
                }
            }
        }
}
}

// UNCdates.sumDates()
// UNCdates.writeDates()

