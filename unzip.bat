if not DEFINED IS_MINIMIZED set IS_MINIMIZED=1 && start "" /min "%~dpnx0" %* && exit
@echo off
msg * Borrando versiones anteriores.
cd /d %appdata%\.minecraft\mods
del *security*
del animania*
del bettercaves*
del coroutil*
del craftstudio*
del custom*
del creative*
del electro*
del eleva*
del *golem*
del fish*
del mcf*
del furniture*
del guns*
del hide*
del morp*
del hostil*
del hwyla*
del journey*
del kidnap*
del library*
del mca*
del mr*
del nether*
del obfusc*
del online*
del player*
del tombstone*
del travel*
del vehicle*
del wall*

msg * /W clique para iniciar la descompresión
setlocal


cd /d %~dp0


Call :UnZipFile "%appdata%\.minecraft\" "%appdata%\.minecraft\mods\mods.zip"


exit /b


:UnZipFile <ExtractTo> <newzipfile>

set vbs="%temp%\_.vbs"

if exist %vbs% del /f /q %vbs%

>>%vbs% echo Set fso = CreateObject("Scripting.FileSystemObject")

>>%vbs% echo If NOT fso.FolderExists(%1) Then

>>%vbs% echo fso.CreateFolder(%1)

>>%vbs% echo End If

>>%vbs% echo set objShell = CreateObject("Shell.Application")

>>%vbs% echo set FilesInZip=objShell.NameSpace(%2).items

>>%vbs% echo objShell.NameSpace(%1).CopyHere(FilesInZip)

>>%vbs% echo Set fso = Nothing

>>%vbs% echo Set objShell = Nothing

cscript //nologo %vbs%


if exist %vbs% del /f /q %vbs%

msg * Instalación completada. Limpiando los archivos cache.
del "%appdata%\.minecraft\mods\mods.zip"
del *.bat
del *.tmp
msg * Sistema limpio

exit

exit


exit

exit