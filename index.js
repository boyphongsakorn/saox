const {app, BrowserWindow, session} = require('electron');
const path = require('path');
const url = require('url');

let win;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    icon: __dirname + '/img/saoxlogo.png',
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
      nativeWindowOpen: true,
      enableRemoteModule: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('test.html')

  win.setThumbarButtons([
    {
      tooltip: 'Play',
      icon: path.join(__dirname, '/img/play.png'),
      click () { win.webContents.send('media-key', 'MediaPlayPause') }
    }
  ])

  win.maximize();

  // Open the DevTools.
   win.webContents.openDevTools()

  // session.defaultSession.cookies.get({}, (error, cookies) => {
  //  console.log(error, cookies)
  // });

}

app.commandLine.appendSwitch('disable-site-isolation-trials')

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
/*app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})*/

app.on('window-all-closed', app.quit);
app.on('before-quit', () => {
  globalShortcut.unregisterAll()
  win.removeAllListeners('close');
  win.close();
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.