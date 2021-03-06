
      var space = new CanvasSpace( "ch1_pt_space", "white" ).display("#ch1-canvas-scrollby");
      var form = new Form( space );

      var alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"; // alphabets to switch every step
      var font = "Roboto Mono";
      var count = 0;
      var maxScale = 250;
      var scale = 25;
      var censor = function(name) {
        var t = 3;
        return name.substr(0,t) + "****************".substr(0,name.length - t);
      }
      var padName = function(name, len) {
        return name + "                             ".substring(0,len - name.length);
      }
      var getVotingRecord = function(o) {
        return o["GENERAL-11/02/2004"] + (o["GENERAL-11/02/2004"] ? "X" : "-" )+ (o["GENERAL-11/02/2010"] ? "X" : "-" )+ (o["GENERAL-11/03/2009"] ? "X" : "-" )+ (o["GENERAL-11/03/2015"] ? "X" : "-" )+ (o["GENERAL-11/04/2003"] ? "X" : "-" )+ (o["GENERAL-11/04/2008"] ? "X" : "-" )+ (o["GENERAL-11/04/2014"] ? "X" : "-" )+ (o["GENERAL-11/05/2002"] ? "X" : "-" )+ (o["GENERAL-11/05/2013"] ? "X" : "-" )+ (o["GENERAL-11/06/2001"] ? "X" : "-" )+ (o["GENERAL-11/06/2007"] ? "X" : "-" )+ (o["GENERAL-11/06/2012"] ? "X" : "-" )+ (o["GENERAL-11/07/2000"] ? "X" : "-" )+ (o["GENERAL-11/07/2006"] ? "X" : "-" )+ (o["GENERAL-11/08/2005"] ? "X" : "-" )+ (o["GENERAL-11/08/2011"] ? "X" : "-" )+ (o["GENERAL-11/18/2008"] ? "X" : "-" )+ (o["GENERAL-12/11/2007"] ? "X" : "-"); 
      }
      var c = 0;
      var middleString = "P NAME       FIRSTNAME        DATE_BIRTH    RESIDENTIAL_ADDRESS       ZIP   CITY            VOTING_HISTORY";
      var fontSize = space.size.x / middleString.length *1.5;
      var maxRows = space.size.y / fontSize;
      space.add({
        animate: function(time, fps, context) {
          if(time % 1000 < 300) c = c < window.voternames.length - maxRows -1 ? c + 1 : 0;
          for(var i = 0; i<maxRows;i++) {
            v = window.voternames[c+i];
            var col = Math.round( (255 * Math.abs(maxRows/2 - i) / (maxRows/2) ));
            // col = 255;
            form.fill( `rgba(${col},${col}, ${col}, 1)` ).font( fontSize, font);
            form.text( new Point(20, fontSize*i), `${v.PARTY_AFFILIATION ? v.PARTY_AFFILIATION : " "} ${padName(v.FIRST_NAME, 10)} ${padName(censor(v.LAST_NAME), 15)}  ${v.DATE_OF_BIRTH + "   "} ${padName(v.RESIDENTIAL_ADDRESS1.replace(/\d/g, "*"), 25)} ${v.RESIDENTIAL_ZIP} ${padName(v.RESIDENTIAL_CITY,15)} ${getVotingRecord(v)}`, 2000);
          }
          form.fill("rgba(255,255,255,0.9)").rect( new Pair( 0, (maxRows/2 - 1) * fontSize - 3, space.size.x, (maxRows/2 + 2) * fontSize ) ).stroke(false);
          form.fill("black").font(fontSize, font).text( new Point(20, ((maxRows/2 - 1) * fontSize + 2) + (2*fontSize) ), middleString,2000, 0, -10);

          //form.fill("rgba(0,0,0,0.9)").rect( new Pair(space.size.x/2 - 240,space.size.y/2 - 200,space.size.x/2 +230,space.size.y/2 - 110) ).stroke(false);
          //form.fill("white").font(30, "monospace").text( new Point(space.size.x/2, space.size.y/2 - 150), "This is what they know",1000,-200);
        },
        onSpaceResize(x,y) {
          fontSize = space.size.x / middleString.length *1.5;
          maxRows = space.size.y / fontSize;
        }
      });
      space.bindMouse();
      space.play();
