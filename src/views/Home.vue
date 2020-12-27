<template>
  <div class="settings">
    <img alt="Vue logo" src="../assets/logo.png">

    <h1>Settings</h1>

    <form action="#/about">
      <label for="seed">Názov hry (názov hry musí byť rovnaký medzi všetkými hráčmi!): </label>
      <input type="text" v-model="payload.seed" name="seed"><br><br>

      <label for="count">Počet hráčov: </label>
      <input type="number" v-model="payload.count" name="count"><br><br>

      <label for="player">Číslo hráča (od 0 po počet hráčov (nie vrátane!)): </label>
      <input type="number" v-model="payload.player" name="player"><br><br>
      
      <label for="iteration">Číslo ťahu (ak ste sa stratili v hre :( )): </label>
      <input type="number" v-model="payload.iteration" name="iteration"><br><br>

      <input type="submit" value="Start">
    </form>

    <h1>Pravidlá hry</h1>

    <p>Vo veľmi progresívnej firme hľadajú kandidáta do atraktívej a zaujímavej pozície, niečoho, čo sa zvyčajne nerobí, ale kvôli (ne)štastnej slučke náhod, sa na pohovor dostanete so sériou veľmi dôležitých a prospešných kvalít, ktoré rozhodne nevystrašia, akéhokoľvek človeka z HR!</p>

    <p>Na začiatku hry sa náhodne vyberie ten, kto tento pohovor bude robiť, a karta práce, na ktorú sa ostatní hráči budú hlásiť ako kandidáti. Kandidáti dostanú 4 karty kvalít, ktoré budú musieť zahrnúť do svojho pohovoru, tieto kvality môžu byť len ľudské vlastnosti alebo aj akty, ktoré budete na pohovore robiť, tieto vlastnosti musíte ohlásiť svojim protihráčom aj pohovorcovi. Keď sú všetci pripravení, začne sa pohovor, ťah končí, keď všetci zložia pohovor a vyberie sa kandidát.</p>

    <p>Spravidla výhrava ten, kto získane najviac pozícií za celé kolo, ale môžete hrať aj dlhšie :P </p>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      payload: {
        player: 0,
        seed: '',
        iteration: 0,
        count: 0,
      }
    }
  },
  computed: {
    player() {
      return this.$store.getters.getPlayer()
    }
  },
  
}
</script>
