import Link from "next/link";

export const metadata = {
  title: "Mentions légales & confidentialité",
  description:
    "Mentions légales et politique de confidentialité du service DYWGODWM.",
};

const LAST_UPDATE = "18 août 2026";

function Section({ title, children }) {
  return (
    <section className="mt-10">
      <h2 className="font-champ text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 text-base">{children}</div>
    </section>
  );
}

function Article({ title, children }) {
  return (
    <div>
      <h3 className="font-champ text-xl">{title}</h3>
      <div className="mt-1 space-y-2">{children}</div>
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

      <Section title="Mentions légales">
        <Article title="Éditeur du site">
          <p>
            {/* TODO : à compléter par l'éditeur — obligation de l'article 6 III de la LCEN */}
            [À COMPLÉTER : nom et prénom de l&apos;éditeur, statut (particulier
            ou société), adresse postale, adresse email de contact, et numéro
            SIREN le cas échéant.]
          </p>
          <p>
            DYWGODWM est un projet personnel, sans finalité commerciale et sans
            publicité.
          </p>
        </Article>

        <Article title="Directeur de la publication">
          <p>[À COMPLÉTER : nom et prénom.]</p>
        </Article>

        <Article title="Hébergement">
          <p>
            Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut,
            CA 91789, États-Unis — vercel.com.
          </p>
          <p>
            La base de données est hébergée par Neon Inc. (PostgreSQL managé) —
            neon.tech.
          </p>
        </Article>

        <Article title="Propriété intellectuelle">
          <p>
            Le concept original de cette page est inspiré du travail d&apos;OlieWu.
            Le code de ce site est publié sur GitHub.
          </p>
        </Article>
      </Section>

      <Section title="Politique de confidentialité">
        <Article title="Responsable du traitement">
          <p>
            [À COMPLÉTER : nom et adresse email du responsable de traitement —
            c&apos;est cette adresse qui recevra les demandes d&apos;exercice des
            droits.]
          </p>
        </Article>

        <Article title="Données collectées">
          <p>Le service enregistre uniquement :</p>
          <ul className="ml-5 list-disc space-y-1">
            <li>
              <strong>Pour la personne qui crée un lien</strong> : son prénom ou
              son nom, son adresse email, ainsi que les lieux qu&apos;elle
              propose.
            </li>
            <li>
              <strong>Pour la personne invitée</strong> : le prénom saisi par la
              personne qui a créé le lien, puis le lieu, la date et l&apos;heure
              qu&apos;elle choisit, et éventuellement une note libre.
            </li>
          </ul>
          <p>
            Aucune autre donnée n&apos;est demandée : ni mot de passe, ni numéro
            de téléphone, ni donnée de paiement. Il n&apos;y a pas de création de
            compte.
          </p>
        </Article>

        <Article title="Pourquoi ces données sont collectées">
          <p>
            L&apos;adresse email de la personne qui crée le lien sert à deux
            choses, et à rien d&apos;autre : vérifier qu&apos;elle est bien
            titulaire de l&apos;adresse (le lien reste inactif tant que cette
            vérification n&apos;a pas eu lieu), puis lui transmettre la réponse
            de son invité·e. Les prénoms et les lieux servent uniquement à
            afficher l&apos;invitation.
          </p>
          <p>
            Ces adresses ne sont jamais utilisées pour de la prospection et ne
            sont ni vendues ni transmises à des tiers à des fins commerciales.
          </p>
          <p>
            Base légale : l&apos;exécution du service demandé par la personne qui
            crée le lien, et l&apos;intérêt légitime à permettre à son invité·e
            de répondre.
          </p>
        </Article>

        <Article title="Qui a accès aux données">
          <p>
            Outre l&apos;éditeur, seuls les prestataires techniques nécessaires
            au fonctionnement du service y ont accès, en tant que
            sous-traitants : Vercel (hébergement du site et mesure
            d&apos;audience), Neon (hébergement de la base de données) et le
            fournisseur d&apos;envoi d&apos;emails utilisé pour les
            notifications.
          </p>
          <p>
            Vercel Inc. et Neon Inc. étant établis aux États-Unis, un transfert
            de données hors de l&apos;Union européenne est possible ; il est
            encadré par les garanties contractuelles de ces prestataires
            (clauses contractuelles types et/ou Data Privacy Framework).
          </p>
        </Article>

        <Article title="Durée de conservation">
          <p>
            Les données liées à une invitation sont conservées tant que le lien
            existe.
            {/* TODO : aucune purge automatique n'est implémentée aujourd'hui. */}{" "}
            [À COMPLÉTER : indiquer la durée retenue, par exemple « les
            invitations sont supprimées 12 mois après leur création ». Aucune
            suppression automatique n&apos;est implémentée à ce jour : toute
            durée annoncée ici doit correspondre à une suppression réellement
            effectuée.]
          </p>
        </Article>

        <Article title="Cookies et mesure d'audience">
          <p>
            Ce site ne dépose aucun cookie et n&apos;utilise ni
            <code className="px-1">localStorage</code> ni
            <code className="px-1">sessionStorage</code>.
          </p>
          <p>
            La fréquentation est mesurée avec Vercel Web Analytics, un outil
            sans cookie qui ne permet ni de vous identifier, ni de vous suivre
            d&apos;un site à l&apos;autre : il ne compte que les pages vues et
            des informations générales (type d&apos;appareil, pays, page
            d&apos;origine).
          </p>
        </Article>

        <Article title="Vos droits">
          <p>
            Vous disposez d&apos;un droit d&apos;accès, de rectification,
            d&apos;effacement, d&apos;opposition, de limitation et de
            portabilité sur vos données. Pour l&apos;exercer, écrivez à
            l&apos;adresse de contact indiquée plus haut : la demande est
            traitée dans un délai d&apos;un mois.
          </p>
          <p>
            Si le prénom d&apos;une personne a été saisi par quelqu&apos;un
            d&apos;autre lors de la création d&apos;un lien, cette personne peut
            elle aussi demander la suppression de l&apos;invitation
            correspondante.
          </p>
          <p>
            Vous pouvez également introduire une réclamation auprès de la CNIL —
            cnil.fr.
          </p>
        </Article>

        <Article title="Sécurité">
          <p>
            Les échanges avec le site sont chiffrés (HTTPS) et l&apos;accès à la
            base de données est restreint. Gardez toutefois à l&apos;esprit que
            toute personne disposant de l&apos;adresse d&apos;une invitation peut
            l&apos;ouvrir : ce lien n&apos;est pas protégé par un mot de passe.
          </p>
        </Article>
      </Section>

      <div className="mt-12 flex flex-col items-center gap-4 pb-4">
        <Link href="/" className="underline underline-offset-4 hover:opacity-80">
          Back to home
        </Link>
      </div>
    </div>
  );
}
