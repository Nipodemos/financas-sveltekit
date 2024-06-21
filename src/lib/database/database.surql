DEFINE TABLE usuario SCHEMAFULL PERMISSIONS 
FOR select,update,create WHERE id = $auth.id
FOR delete NONE
;
DEFINE FIELD nome ON usuario TYPE string ASSERT string::len($value) > 2;
DEFINE FIELD email ON usuario TYPE string ASSERT string::len($value) > 2;
DEFINE FIELD senha ON usuario TYPE string ASSERT string::len($value) > 2;
DEFINE FIELD criadoEm ON usuario TYPE datetime VALUE $before OR time::now() DEFAULT time::now() READONLY;
DEFINE FIELD canceladoEm ON usuario TYPE datetime | null DEFAULT null;
DEFINE FIELD atualizadoEm ON usuario TYPE datetime VALUE time::now() DEFAULT time::now() READONLY;

DEFINE SCOPE usuario
  SESSION 14d
  SIGNIN ( SELECT * FROM usuario WHERE email = $email AND crypto::argon2::compare(senha, $senha) )
  SIGNUP ( 
    CREATE usuario CONTENT {
			nome: $nome,
			email: $email,
			senha: crypto::argon2::generate($senha)
		}
  )
;


DEFINE TABLE categoria SCHEMAFULL PERMISSIONS
FOR select,create, update WHERE usuario = $auth.id
FOR delete NONE;
DEFINE FIELD nome ON categoria TYPE string ASSERT string::len($value) > 2;
DEFINE FIELD icone ON categoria TYPE string | null DEFAULT null;
DEFINE FIELD tipoCategoria ON categoria TYPE string ASSERT $value INSIDE ['receita','despesa'];
DEFINE FIELD usuario ON categoria TYPE record<usuario> ASSERT $value != NONE;
DEFINE FIELD criadoEm ON categoria TYPE datetime VALUE $before OR time::now() DEFAULT time::now() READONLY;
DEFINE FIELD canceladoEm ON categoria TYPE datetime | null DEFAULT null;
DEFINE FIELD atualizadoEm ON categoria TYPE datetime VALUE time::now() DEFAULT time::now() READONLY;

DEFINE INDEX nome_unico ON categoria FIELDS nome, tipoCategoria UNIQUE;

DEFINE TABLE cartaoDebito SCHEMAFULL PERMISSIONS
FOR select,create,update WHERE usuario = $auth.id
FOR delete NONE;

DEFINE FIELD nome ON cartaoDebito TYPE string ASSERT string::len($value) > 2;
DEFINE FIELD usuario ON cartaoDebito TYPE record<usuario> ASSERT $value != NONE;
DEFINE FIELD criadoEm ON cartaoDebito TYPE datetime VALUE $before OR time::now() DEFAULT time::now() READONLY;
DEFINE FIELD canceladoEm ON cartaoDebito TYPE datetime | null DEFAULT null;
DEFINE FIELD atualizadoEm ON cartaoDebito TYPE datetime VALUE time::now() DEFAULT time::now() READONLY;

DEFINE INDEX nome_unico ON cartaoDebito FIELDS nome UNIQUE;

DEFINE TABLE cartaoCredito SCHEMAFULL PERMISSIONS
FOR select,create,update WHERE usuario = $auth.id
FOR delete NONE;

DEFINE FIELD nome ON cartaoCredito TYPE string ASSERT string::len($value) > 2;
DEFINE FIELD usuario ON cartaoCredito TYPE record<usuario> ASSERT $value != NONE;
DEFINE FIELD diaVencimento ON cartaoCredito TYPE number ASSERT $value > 0 AND $value < 32;
DEFINE FIELD criadoEm ON cartaoCredito TYPE datetime VALUE $before OR time::now() DEFAULT time::now() READONLY;
DEFINE FIELD canceladoEm ON cartaoCredito TYPE datetime | null DEFAULT null;
DEFINE FIELD atualizadoEm ON cartaoCredito TYPE datetime VALUE time::now() DEFAULT time::now() READONLY;

DEFINE INDEX nome_unico ON cartaoCredito FIELDS nome UNIQUE;

DEFINE TABLE cartaoCreditoTotalizador SCHEMAFULL PERMISSIONS
FOR select,create,update WHERE usuario = $auth.id
FOR delete NONE;
DEFINE FIELD cartaoCredito ON cartaoCreditoTotalizador TYPE record<cartaoCredito> ASSERT $value != NONE;
DEFINE FIELD usuario ON cartaoCreditoTotalizador TYPE record<usuario> ASSERT $value != NONE;
DEFINE FIELD mes ON cartaoCreditoTotalizador TYPE number ASSERT $value > 0;
DEFINE FIELD ano ON cartaoCreditoTotalizador TYPE number ASSERT $value > 0;
DEFINE FIELD total ON cartaoCreditoTotalizador TYPE number ASSERT $value > 0;
DEFINE FIELD criadoEm ON cartaoCreditoTotalizador TYPE datetime VALUE $before OR time::now() DEFAULT time::now() READONLY;
DEFINE FIELD canceladoEm ON cartaoCreditoTotalizador TYPE datetime | null DEFAULT null;
DEFINE FIELD atualizadoEm ON cartaoCreditoTotalizador TYPE datetime VALUE time::now() DEFAULT time::now() READONLY;

DEFINE INDEX cartaoCredito_mes_ano_unico ON cartaoCreditoTotalizador FIELDS cartaoCredito, mes, ano UNIQUE;

DEFINE TABLE cartaoDebitoTotalizador SCHEMAFULL PERMISSIONS
FOR select,create,update WHERE usuario = $auth.id
FOR delete NONE;

DEFINE FIELD cartaoDebito ON cartaoDebitoTotalizador TYPE record<cartaoDebito> ASSERT $value != NONE;
DEFINE FIELD usuario ON cartaoDebitoTotalizador TYPE record<usuario> ASSERT $value != NONE;
DEFINE FIELD mes ON cartaoDebitoTotalizador TYPE number ASSERT $value > 0 AND $value < 13;
DEFINE FIELD ano ON cartaoDebitoTotalizador TYPE number ASSERT $value > 0 AND $value < 10000;
DEFINE FIELD total ON cartaoDebitoTotalizador TYPE number ASSERT $value > 0;
DEFINE FIELD criadoEm ON cartaoDebitoTotalizador TYPE datetime VALUE $before OR time::now() DEFAULT time::now() READONLY;
DEFINE FIELD canceladoEm ON cartaoDebitoTotalizador TYPE datetime | null DEFAULT null;
DEFINE FIELD atualizadoEm ON cartaoDebitoTotalizador TYPE datetime VALUE time::now() DEFAULT time::now() READONLY;

DEFINE INDEX cartaoDebito_mes_ano_unico ON cartaoDebitoTotalizador FIELDS cartaoDebito, mes, ano UNIQUE;

DEFINE TABLE transacao SCHEMAFULL PERMISSIONS
FOR select,create,update WHERE usuario = $auth.id
FOR delete NONE;
DEFINE FIELD tipoTransacao ON transacao TYPE string ASSERT $value INSIDE ['receita','despesa'];
DEFINE FIELD tipoRepetir ON transacao TYPE string ASSERT $value INSIDE ['unica','parcelada','recorrente'];
DEFINE FIELD descricao ON transacao TYPE string ASSERT string::len($value) > 2;
DEFINE FIELD usuario ON transacao TYPE record<usuario> ASSERT $value != NONE;
DEFINE FIELD valor ON transacao TYPE number ASSERT $value > 0;
DEFINE FIELD data ON transacao TYPE datetime ASSERT type::is::datetime(type::datetime($value));
DEFINE FIELD categoria ON transacao TYPE record<categoria> ASSERT $value != NONE;


