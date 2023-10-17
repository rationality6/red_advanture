class SaveHelper {
  weaponMaxDamageUpgradeSave() {}

  weaponDamageRangeUpgradeSave() {}

  coinSave() {}

  addCoinSave() {
    if (!localStorage.getItem("coins")) {
      localStorage.setItem("coins", "0");
    }

    let localStorageCoins = Number(localStorage.getItem("coins"));
    localStorageCoins += 1;
    localStorage.setItem("coins", JSON.stringify(localStorageCoins));
  }

  coinLoad() {
    if (!localStorage.getItem("coins")) {
      localStorage.setItem("coins", "0");
    }

    let localStorageCoins = Number(localStorage.getItem("coins"));
    return localStorageCoins;
  }
}
