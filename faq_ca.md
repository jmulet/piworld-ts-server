# Què és piWorld.es?

piWorld és un projecte lliure i open-source incialment pensat per dur a terme clase invertida als instituts de secundaria. Els alumnes accedeixen al sistema amb un usuari i contrasenya que els proporciona l'administrador del centre. Si voleu participar en el projecte el responsable del centre ha d'enviar les seves dades a l'adreça piworld.es@gmail.com.

# Estat actual

En aquests moments s'està treballant per millorar la plataforma. En particular, s'està exportant tot el servidor nodejs a typescript i
el client que estava programat en angularjs a una versió més moderna d'angular angular5-6. Per aquests motius el desenvolupament i
la correcció d'errors de la plataforma actual està una mica descuidada.

# Com contribuir a piWorld.es

Hi ha diferents formes per poder contribuir al projecte.

- Creant activitats en video i compartir-les amb els altres usuaris.(Vegeu més avall com crear activitats)
- Enviant materials (manuals, llibres, etc.) a piworld.es@gmail.com perquè puguin esser recopilats i incorporats a la base de dades.
- Si teniu coneixements de programació javascript - typescript podeu fer un fork d'aquest projecte github i sol·licitar pull requests. En aquest apartat hi ha moltíssima feina per fer :-).

# Com començar a configurar el meu centre?
Si l'administrador de piworld ja t'ha proporcionat un usuari amb el role teacher_admin, podeu seguir llegint aquest apartat.

En primer lloc accedim al menu Centre de la part superior de la imatge

![01.png](/docs/01.png) 

La primera passa consisteix en crear usuaris que poden ésser teacher o students. Els teacher podran alhora crear groups (serien els equivalent a un curs de moodle). 

Podeu crear usuaris un per un o be utilitzar la eina d'importació massiva on aferrau un llistat d'usuaris en format CSV així com mostra la imatge

![02.png](/docs/02.png) 

La seguent passa consisteix en crear groups i dins cada group els temes per organitzar el contingut. Vegeu la captura de pantalla.

![03.png](/docs/03.png) 

Cada tema o unitat pot tenir diferents modes de presentació: 

- Hidden = amagat
- Collapsed = Per defecte nomes surt el titol i s'ha de desplegar per veure els continguts
- Auto = Nomes es mostra la primera entrada del tema a no ser que sigui el tema actiu (en vermell) pel qual es mostren tots els continguts
- Expanded = Es mostren tots els continguts de la unitat


Afegiu o llevau els alumnes que vulgueu i pitjeu acceptar.

La seguent passa consisteix en apuntar (Enroll) usuaris al group que hem creat. Per això aneu al menú principal i trieu "Estudiants". Pitjeu sobre el botó Enrolla usuaris. Vos apareixerà això

![04.png](/docs/04.png) 

Si tornam a la pantalla inicial és possible que haguem de pitjar el botó refresca per actualizar els canvis. Tot seguit crearem continguts. Per això, el que feim és activar el mode EDICIÓ ON.

![06.png](/docs/06.png) 

Basicament hi ha dos tipus de contiguts. Quadres de text html explicatius amb enllaços, etc. i activitats que son assignades pel professor. Aquesta pantalla mostra com afegir un quadre de text a una unitat

![07.png](/docs/07.png) 

Aquesta altra captura mostra les com cercar una activitat i assignar-la a un group/unitat

![08.png](/docs/08.png) 

Si tot us ha anat be, el resultat final d'aquests passos d'administracio harien d'esser

![10.png](/docs/10.png) 



# Com crear activitats en vídeo?

Bàsicament el professor prepara un video que es penja com a public o compartit per url a youtube. Com fer un video i com penjar-lo a youtube s'escapa de l'abast d'aquest manual. 

Una vegada es té la id del video de youtube (com exemple, https://www.youtube.com/watch?v=ernSMwm3RC4), es va a la pantalla de cerca d'activitats i pitjam sobre el boto crear. Triam del desplegable, "Activity with video". 

S'obrirà la seguent pantalla on anirem en primer lloc aferra la Video ID/URL: https://www.youtube.com/watch?v=ernSMwm3RC4 i tot seguit acabarem d'especificar titols, descripcions, tags, nivells on va destinada, etc. També (de forma experimental) es possible afegir preguntes incrustades a diferents moments del video.

 ![11.png](/docs/11.png) 
