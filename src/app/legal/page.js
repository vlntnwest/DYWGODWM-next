import Link from "next/link";

export const metadata = {
  title: "Mentions légales & confidentialité",
  description:
    "Ce que DYWGODWM stocke, pourquoi, et comment tout faire supprimer.",
};

const LAST_UPDATE = "18 août 2026";

function Article({ title, children }) {
  return (
    <div>
      <h2 className="font-champ text-2xl">{title}</h2>
      <div className="mt-2 space-y-2 text-base">{children}</div>
    </div>
  );
}

export default function Legal() {
  return (
    <div className="w-full max-w-2xl max-h-[calc(100dvh-2rem)] overflow-y-auto py-8">
      <h1 className="font-champ text-5xl text-center">
        Mentions légales &amp; confidentialité
      </h1>
      <p className="mt-3 text-center text-sm opacity-70">
        Dernière mise à jour : {LAST_UPDATE}
      </p>

      <p className="mt-8 text-base">
        DYWGODWM est un projet personnel, fait pour rigoler. Il n&apos;y a pas
        d&apos;entreprise derrière, pas de pub, rien à vendre. Mais comme le site
        garde ton prénom et ton email le temps de faire son boulot, voilà
        exactement ce qui se passe.
      </p>

      <div className="mt-10 space-y-8">
        <Article title="Qui édite ce site">
          {/* TODO : un prénom ou un pseudo suffit. Un site édité par un particulier
              à titre non professionnel n'a pas à publier son adresse : il suffit
              que l'hébergeur la connaisse (art. 6 III 2 de la LCEN). */}
          <p>
            [À COMPLÉTER : ton prénom ou ton pseudo] — à titre personnel et non
            professionnel.
          </p>
          <p>
            Le site est hébergé par Vercel Inc. (340 S Lemon Ave #4133, Walnut,
            CA 91789, États-Unis) et la base de données par Neon Inc.
          </p>
          <p>
            Le concept de la page est inspiré du travail d&apos;OlieWu, et le
            code du site est public sur GitHub.
          </p>
        </Article>

        <Article title="Ce qui est stocké">
          <ul className="ml-5 list-disc space-y-1">
            <li>
              Quand tu crées un lien : ton prénom, ton adresse email, le prénom
              de la personne que tu invites, et les lieux que tu proposes.
            </li>
            <li>
              Quand cette personne répond : le lieu, la date et l&apos;heure
              qu&apos;elle choisit.
            </li>
          </ul>
          <p>
            C&apos;est tout. Pas de mot de passe, pas de numéro de téléphone, pas
            de compte à créer.
          </p>
        </Article>

        <Article title="À quoi ça sert">
          <p>
            Ton email sert à deux choses : vérifier que c&apos;est bien le tien —
            tant que tu n&apos;as pas cliqué sur le mail de confirmation, ton
            lien reste inactif — puis t&apos;envoyer la réponse. Les prénoms et
            les lieux servent juste à afficher l&apos;invitation.
          </p>
          <p>
            Ton adresse ne sert à rien d&apos;autre : aucune newsletter, aucune
            revente, aucun partage à des tiers.
          </p>
        </Article>

        <Article title="Qui d'autre y a accès">
          <p>
            Uniquement les outils qui font tourner le site : Vercel
            (hébergement et mesure d&apos;audience), Neon (base de données) et le
            service qui envoie les emails. Vercel et Neon étant américains, tes
            données peuvent être stockées hors de l&apos;Union européenne.
          </p>
        </Article>

        <Article title="Combien de temps">
          <p>
            Les données d&apos;une invitation restent tant que le lien existe.
            Il n&apos;y a pas de suppression automatique pour le moment : si tu
            veux que tout disparaisse, demande-le et ce sera fait à la main.
          </p>
        </Article>

        <Article title="Cookies">
          <p>
            Aucun. Le site ne dépose pas de cookie et ne stocke rien dans ton
            navigateur. La fréquentation est mesurée avec Vercel Web Analytics,
            qui compte les pages vues sans cookie et sans permettre de
            t&apos;identifier ni de te suivre d&apos;un site à l&apos;autre.
          </p>
        </Article>

        <Article title="Tes droits">
          <p>
            Tu peux demander à consulter tes données, les corriger ou les faire
            supprimer, en écrivant à{" "}
            {/* TODO : l'adresse à laquelle tu veux recevoir ces demandes. */}
            [À COMPLÉTER : adresse email de contact]. La même chose vaut pour la
            personne dont tu as saisi le prénom : elle peut demander la
            suppression de l&apos;invitation qui la concerne.
          </p>
          <p>
            Et si quelque chose ne va pas, tu peux saisir la CNIL — cnil.fr.
          </p>
        </Article>

        <Article title="Une précision utile">
          <p>
            Les échanges avec le site sont chiffrés (HTTPS), mais un lien
            d&apos;invitation n&apos;est protégé par aucun mot de passe :
            n&apos;importe qui l&apos;ayant en main peut l&apos;ouvrir. Envoie-le
            uniquement à la personne concernée.
          </p>
        </Article>
      </div>

      <div className="mt-12 flex flex-col items-center gap-4 pb-4">
        <Link href="/" className="underline underline-offset-4 hover:opacity-80">
          Back to home
        </Link>
      </div>
    </div>
  );
}
