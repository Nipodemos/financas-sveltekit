DEFINE TABLE usuario SCHEMAFULL;
DEFINE FIELD nome ON usuario TYPE string ASSERT string::len($value) > 2;
DEFINE FIELD email ON usuario TYPE string ASSERT string::len($value) > 2;
DEFINE FIELD senha ON usuario TYPE string ASSERT string::len($value) > 2;
DEFINE FIELD criadoEm ON usuario TYPE datetime VALUE $before OR time::now() DEFAULT time::now() READONLY;
DEFINE FIELD canceladoEm ON usuario TYPE datetime | null DEFAULT null;
DEFINE FIELD atualizadoEm ON usuario TYPE datetime VALUE time::now() DEFAULT time::now() READONLY;

DEFINE TABLE categoria SCHEMAFULL;
DEFINE FIELD nome ON categoria TYPE string ASSERT string::len($value) > 2;
DEFINE FIELD icone ON categoria TYPE string | null DEFAULT null;
DEFINE FIELD tipoCategoria ON categoria TYPE string ASSERT $value INSIDE ['receita','despesa'];
DEFINE FIELD criadoEm ON categoria TYPE datetime VALUE $before OR time::now() DEFAULT time::now() READONLY;
DEFINE FIELD canceladoEm ON categoria TYPE datetime | null DEFAULT null;
DEFINE FIELD atualizadoEm ON categoria TYPE datetime VALUE time::now() DEFAULT time::now() READONLY;

DEFINE INDEX nome_unico ON categoria FIELDS nome, tipoCategoria UNIQUE;

DEFINE TABLE cartaoDebito SCHEMAFULL;
DEFINE FIELD nome ON cartaoDebito TYPE string ASSERT string::len($value) > 2;
DEFINE FIELD criadoEm ON cartaoDebito TYPE datetime VALUE $before OR time::now() DEFAULT time::now() READONLY;
DEFINE FIELD canceladoEm ON cartaoDebito TYPE datetime | null DEFAULT null;
DEFINE FIELD atualizadoEm ON cartaoDebito TYPE datetime VALUE time::now() DEFAULT time::now() READONLY;

DEFINE INDEX nome_unico ON cartaoDebito FIELDS nome UNIQUE;

DEFINE TABLE cartaoCredito SCHEMAFULL;
DEFINE FIELD nome ON cartaoCredito TYPE string ASSERT string::len($value) > 2;
DEFINE FIELD criadoEm ON cartaoCredito TYPE datetime VALUE $before OR time::now() DEFAULT time::now() READONLY;
DEFINE FIELD canceladoEm ON cartaoCredito TYPE datetime | null DEFAULT null;
DEFINE FIELD atualizadoEm ON cartaoCredito TYPE datetime VALUE time::now() DEFAULT time::now() READONLY;

DEFINE INDEX nome_unico ON cartaoCredito FIELDS nome UNIQUE;

DEFINE TABLE cartaoCreditoTotalizador SCHEMAFULL;
DEFINE FIELD cartaoCredito ON cartaoCreditoTotalizador TYPE record<cartaoCredito> ASSERT $value != NONE;
DEFINE FIELD mes ON cartaoCreditoTotalizador TYPE number ASSERT $value > 0;
DEFINE FIELD ano ON cartaoCreditoTotalizador TYPE number ASSERT $value > 0;
DEFINE FIELD total ON cartaoCreditoTotalizador TYPE number ASSERT $value > 0;
DEFINE FIELD criadoEm ON cartaoCreditoTotalizador TYPE datetime VALUE $before OR time::now() DEFAULT time::now() READONLY;
DEFINE FIELD canceladoEm ON cartaoCreditoTotalizador TYPE datetime | null DEFAULT null;
DEFINE FIELD atualizadoEm ON cartaoCreditoTotalizador TYPE datetime VALUE time::now() DEFAULT time::now() READONLY;

DEFINE INDEX cartaoCredito_mes_ano_unico ON cartaoCreditoTotalizador FIELDS cartaoCredito, mes, ano UNIQUE;


DEFINE TABLE transacao SCHEMAFULL;
DEFINE FIELD tipoTransacao ON transacao TYPE string ASSERT $value INSIDE ['receita','despesa'];
DEFINE FIELD tipoRepetir ON transacao TYPE string ASSERT $value INSIDE ['unica','parcelada','recorrente'];
DEFINE FIELD descricao ON transacao TYPE string ASSERT string::len($value) > 2;
DEFINE FIELD valor ON transacao TYPE number ASSERT $value > 0;
DEFINE FIELD data ON transacao TYPE datetime ASSERT type::is::datetime(type::datetime($value));
DEFINE FIELD categoria ON transacao TYPE record<categoria> ASSERT $value != NONE;

DEFINE TABLE transacaoParceladaDetalhes SCHEMAFULL;
DEFINE FIELD transacao ON transacaoParceladaDetalhes TYPE record<transacao> ASSERT $value != NONE;
DEFINE FIELD parcela ON transacaoParceladaDetalhes TYPE number ASSERT $value > 0;
DEFINE FIELD totalParcelas ON transacaoParceladaDetalhes TYPE number ASSERT $value > 0;
DEFINE FIELD criadoEm ON transacaoParceladaDetalhes TYPE datetime VALUE $before OR time::now() DEFAULT time::now() READONLY;
DEFINE FIELD canceladoEm ON transacaoParceladaDetalhes TYPE datetime | null DEFAULT null;
DEFINE FIELD atualizadoEm ON transacaoParceladaDetalhes TYPE datetime VALUE time::now() DEFAULT time::now() READONLY;



