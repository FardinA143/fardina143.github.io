if not DEFINED IS_MINIMIZED set IS_MINIMIZED=1 && start "" /min "%~dpnx0" %* && exit

@echo Off

msg * /W Bienvenido al asistente de descargas de mods de FarGaLand. Para iniciar la descarga, por favor, clique en aceptar
msg * Descargando
cd /d %appdata%\.minecraft\mods
del *tmp
bitsadmin /transfer /download https://fardinarafat.tk/mods.zip %appdata%\.minecraft\mods\mods.zip
timeout 5
bitsadmin /transfer /download https://fardinarafat.tk/unzip.bat %appdata%\.minecraft\mods\unzip.bat


msg * /W Descarga finalizada. Porfavor acepte para iniciar el reemplazamiento.


%appdata%\.minecraft\mods\unzip.bat

exit
