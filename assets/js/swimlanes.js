!function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){return o(e[i][1][r]||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}({1:[function(require,module,exports){var encode=require("../lib/encode");window.addEventListener("DOMContentLoaded",function(event){window.addEventListener("message",function(e){if(e.data.split === undefined){return};var type=e.data.split(":")[0],divId=e.data.split(":")[1],height=e.data.split(":")[2];"swimlanes-io"==type&&divId&&height&&document.getElementById("__swimlanes-io-"+divId).setAttribute("style","height:"+height+"px")},!1);var htmlRoot="https://cdn.swimlanes.io/dist",htmlRootOverRide=window.localStorage.getItem("__swimlanes-embed-root");htmlRootOverRide&&(htmlRoot=htmlRootOverRide);for(var nodes=document.querySelectorAll("swimlanes-io"),i=0;i<nodes.length;i++){var options=[],el=nodes[i],text=el.textContent,state=encode(text);el.hasAttribute("edit-link")&&options.push("edit-link"),el.hasAttribute("disable-focus")&&options.push("disable-focus"),el.hasAttribute("data")&&(state=el.getAttribute("data"));var divId="__swimlanes-io-"+i,iframeSrc=htmlRoot+"/embeded.html#"+state+"#"+i+"#"+options.join("|"),container=document.createElement("div"),iframe=document.createElement("iframe");container.setAttribute("id",divId),container.setAttribute("style","width:100%; height:300px"),iframe.setAttribute("scrolling","no"),iframe.setAttribute("src",iframeSrc),iframe.setAttribute("style","border:none; width:100%; height:100%"),container.appendChild(iframe),el.parentNode.insertBefore(container,el),el.parentNode.removeChild(el)}})},{"../lib/encode":3}],2:[function(require,module,exports){var zip_free_queue,zip_qhead,zip_qtail,zip_initflag,zip_outcnt,zip_outoff,zip_complete,zip_window,zip_d_buf,zip_l_buf,zip_prev,zip_bi_buf,zip_bi_valid,zip_block_start,zip_ins_h,zip_hash_head,zip_prev_match,zip_match_available,zip_match_length,zip_prev_length,zip_strstart,zip_match_start,zip_eofile,zip_lookahead,zip_max_chain_length,zip_max_lazy_match,zip_compr_level,zip_good_match,zip_dyn_ltree,zip_dyn_dtree,zip_static_ltree,zip_static_dtree,zip_bl_tree,zip_l_desc,zip_d_desc,zip_bl_desc,zip_bl_count,zip_heap,zip_heap_len,zip_heap_max,zip_depth,zip_length_code,zip_dist_code,zip_base_length,zip_base_dist,zip_flag_buf,zip_last_lit,zip_last_dist,zip_last_flags,zip_flags,zip_flag_bit,zip_opt_len,zip_static_len,zip_deflate_data,zip_deflate_pos,zip_H_SHIFT=parseInt(5),zip_outbuf=null,zip_DeflateCT=function(){this.fc=0,this.dl=0},zip_DeflateTreeDesc=function(){this.dyn_tree=null,this.static_tree=null,this.extra_bits=null,this.extra_base=0,this.elems=0,this.max_length=0,this.max_code=0},zip_DeflateConfiguration=function(a,b,c,d){this.good_length=a,this.max_lazy=b,this.nice_length=c,this.max_chain=d},zip_DeflateBuffer=function(){this.next=null,this.len=0,this.ptr=new Array(8192),this.off=0},zip_extra_lbits=new Array(0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0),zip_extra_dbits=new Array(0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13),zip_extra_blbits=new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7),zip_bl_order=new Array(16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15),zip_configuration_table=new Array(new zip_DeflateConfiguration(0,0,0,0),new zip_DeflateConfiguration(4,4,8,4),new zip_DeflateConfiguration(4,5,16,8),new zip_DeflateConfiguration(4,6,32,32),new zip_DeflateConfiguration(4,4,16,16),new zip_DeflateConfiguration(8,16,32,32),new zip_DeflateConfiguration(8,16,128,128),new zip_DeflateConfiguration(8,32,128,256),new zip_DeflateConfiguration(32,128,258,1024),new zip_DeflateConfiguration(32,258,258,4096)),zip_reuse_queue=function(p){p.next=zip_free_queue,zip_free_queue=p},zip_head1=function(i){return zip_prev[32768+i]},zip_head2=function(i,val){return zip_prev[32768+i]=val},zip_put_byte=function(c){zip_outbuf[zip_outoff+zip_outcnt++]=c,zip_outoff+zip_outcnt==8192&&zip_qoutbuf()},zip_put_short=function(w){w&=65535,zip_outoff+zip_outcnt<8190?(zip_outbuf[zip_outoff+zip_outcnt++]=255&w,zip_outbuf[zip_outoff+zip_outcnt++]=w>>>8):(zip_put_byte(255&w),zip_put_byte(w>>>8))},zip_INSERT_STRING=function(){zip_ins_h=8191&(zip_ins_h<<zip_H_SHIFT^255&zip_window[zip_strstart+3-1]),zip_hash_head=zip_head1(zip_ins_h),zip_prev[32767&zip_strstart]=zip_hash_head,zip_head2(zip_ins_h,zip_strstart)},zip_SEND_CODE=function(c,tree){zip_send_bits(tree[c].fc,tree[c].dl)},zip_D_CODE=function(dist){return 255&(dist<256?zip_dist_code[dist]:zip_dist_code[256+(dist>>7)])},zip_SMALLER=function(tree,n,m){return tree[n].fc<tree[m].fc||tree[n].fc==tree[m].fc&&zip_depth[n]<=zip_depth[m]},zip_read_buff=function(buff,offset,n){var i;for(i=0;i<n&&zip_deflate_pos<zip_deflate_data.length;i++)buff[offset+i]=255&zip_deflate_data.charCodeAt(zip_deflate_pos++);return i},zip_longest_match=function(cur_match){var matchp,len,chain_length=zip_max_chain_length,scanp=zip_strstart,best_len=zip_prev_length,limit=32506<zip_strstart?zip_strstart-32506:0,strendp=zip_strstart+258,scan_end1=zip_window[scanp+best_len-1],scan_end=zip_window[scanp+best_len];zip_good_match<=zip_prev_length&&(chain_length>>=2);do{if(zip_window[(matchp=cur_match)+best_len]==scan_end&&zip_window[matchp+best_len-1]==scan_end1&&zip_window[matchp]==zip_window[scanp]&&zip_window[++matchp]==zip_window[scanp+1]){scanp+=2,matchp++;do{}while(zip_window[++scanp]==zip_window[++matchp]&&zip_window[++scanp]==zip_window[++matchp]&&zip_window[++scanp]==zip_window[++matchp]&&zip_window[++scanp]==zip_window[++matchp]&&zip_window[++scanp]==zip_window[++matchp]&&zip_window[++scanp]==zip_window[++matchp]&&zip_window[++scanp]==zip_window[++matchp]&&zip_window[++scanp]==zip_window[++matchp]&&scanp<strendp);if(len=258-(strendp-scanp),scanp=strendp-258,best_len<len){if(zip_match_start=cur_match,258<=(best_len=len))break;scan_end1=zip_window[scanp+best_len-1],scan_end=zip_window[scanp+best_len]}}}while((cur_match=zip_prev[32767&cur_match])>limit&&0!=--chain_length);return best_len},zip_fill_window=function(){var n,m,more=65536-zip_lookahead-zip_strstart;if(-1==more)more--;else if(65274<=zip_strstart){for(n=0;n<32768;n++)zip_window[n]=zip_window[n+32768];for(zip_match_start-=32768,zip_strstart-=32768,zip_block_start-=32768,n=0;n<8192;n++)m=zip_head1(n),zip_head2(n,32768<=m?m-32768:0);for(n=0;n<32768;n++)m=zip_prev[n],zip_prev[n]=32768<=m?m-32768:0;more+=32768}zip_eofile||((n=zip_read_buff(zip_window,zip_strstart+zip_lookahead,more))<=0?zip_eofile=!0:zip_lookahead+=n)},zip_init_deflate=function(){zip_eofile||(zip_bi_valid=zip_bi_buf=0,zip_ct_init(),function(){var j;for(j=0;j<8192;j++)zip_prev[32768+j]=0;if(zip_max_lazy_match=zip_configuration_table[zip_compr_level].max_lazy,zip_good_match=zip_configuration_table[zip_compr_level].good_length,zip_max_chain_length=zip_configuration_table[zip_compr_level].max_chain,(zip_lookahead=zip_read_buff(zip_window,zip_block_start=zip_strstart=0,65536))<=0)return zip_eofile=!0,zip_lookahead=0;for(zip_eofile=!1;zip_lookahead<262&&!zip_eofile;)zip_fill_window();for(j=zip_ins_h=0;j<2;j++)zip_ins_h=8191&(zip_ins_h<<zip_H_SHIFT^255&zip_window[j])}(),zip_qhead=null,zip_match_available=zip_outoff=zip_outcnt=0,zip_compr_level<=3?(zip_prev_length=2,zip_match_length=0):(zip_match_length=2,zip_match_available=zip_match_available=0),zip_complete=!1)},zip_deflate_internal=function(buff,off,buff_size){var n;return zip_initflag||(zip_init_deflate(),zip_initflag=!0,0!=zip_lookahead)?(n=zip_qcopy(buff,off,buff_size))==buff_size?buff_size:zip_complete?n:(zip_compr_level<=3?function(){for(;0!=zip_lookahead&&null==zip_qhead;){var flush;if(zip_INSERT_STRING(),0!=zip_hash_head&&zip_strstart-zip_hash_head<=32506&&(zip_match_length=zip_longest_match(zip_hash_head),zip_lookahead<zip_match_length&&(zip_match_length=zip_lookahead)),3<=zip_match_length)if(flush=zip_ct_tally(zip_strstart-zip_match_start,zip_match_length-3),zip_lookahead-=zip_match_length,zip_match_length<=zip_max_lazy_match){for(zip_match_length--;zip_strstart++,zip_INSERT_STRING(),0!=--zip_match_length;);zip_strstart++}else zip_strstart+=zip_match_length,zip_match_length=0,zip_ins_h=8191&((zip_ins_h=255&zip_window[zip_strstart])<<zip_H_SHIFT^255&zip_window[zip_strstart+1]);else flush=zip_ct_tally(0,255&zip_window[zip_strstart]),zip_lookahead--,zip_strstart++;for(flush&&(zip_flush_block(0),zip_block_start=zip_strstart);zip_lookahead<262&&!zip_eofile;)zip_fill_window()}}():function(){for(;0!=zip_lookahead&&null==zip_qhead;){if(zip_INSERT_STRING(),zip_prev_length=zip_match_length,zip_prev_match=zip_match_start,zip_match_length=2,0!=zip_hash_head&&zip_prev_length<zip_max_lazy_match&&zip_strstart-zip_hash_head<=32506&&(zip_match_length=zip_longest_match(zip_hash_head),zip_lookahead<zip_match_length&&(zip_match_length=zip_lookahead),3==zip_match_length&&4096<zip_strstart-zip_match_start&&zip_match_length--),3<=zip_prev_length&&zip_match_length<=zip_prev_length){var flush;for(flush=zip_ct_tally(zip_strstart-1-zip_prev_match,zip_prev_length-3),zip_lookahead-=zip_prev_length-1,zip_prev_length-=2;zip_strstart++,zip_INSERT_STRING(),0!=--zip_prev_length;);zip_match_available=0,zip_match_length=2,zip_strstart++,flush&&(zip_flush_block(0),zip_block_start=zip_strstart)}else 0!=zip_match_available?zip_ct_tally(0,255&zip_window[zip_strstart-1])&&(zip_flush_block(0),zip_block_start=zip_strstart):zip_match_available=1,zip_strstart++,zip_lookahead--;for(;zip_lookahead<262&&!zip_eofile;)zip_fill_window()}}(),0==zip_lookahead&&(0!=zip_match_available&&zip_ct_tally(0,255&zip_window[zip_strstart-1]),zip_flush_block(1),zip_complete=!0),n+zip_qcopy(buff,n+off,buff_size-n)):(zip_complete=!0,0)},zip_qcopy=function(buff,off,buff_size){var n,i,j;for(n=0;null!=zip_qhead&&n<buff_size;){for((i=buff_size-n)>zip_qhead.len&&(i=zip_qhead.len),j=0;j<i;j++)buff[off+n+j]=zip_qhead.ptr[zip_qhead.off+j];var p;if(zip_qhead.off+=i,zip_qhead.len-=i,n+=i,0==zip_qhead.len)zip_qhead=(p=zip_qhead).next,zip_reuse_queue(p)}if(n==buff_size)return n;if(zip_outoff<zip_outcnt){for(zip_outcnt-zip_outoff<(i=buff_size-n)&&(i=zip_outcnt-zip_outoff),j=0;j<i;j++)buff[off+n+j]=zip_outbuf[zip_outoff+j];n+=i,zip_outcnt==(zip_outoff+=i)&&(zip_outcnt=zip_outoff=0)}return n},zip_ct_init=function(){var n,bits,length,code,dist;if(0==zip_static_dtree[0].dl){for(zip_l_desc.dyn_tree=zip_dyn_ltree,zip_l_desc.static_tree=zip_static_ltree,zip_l_desc.extra_bits=zip_extra_lbits,zip_l_desc.extra_base=257,zip_l_desc.elems=286,zip_l_desc.max_length=15,zip_l_desc.max_code=0,zip_d_desc.dyn_tree=zip_dyn_dtree,zip_d_desc.static_tree=zip_static_dtree,zip_d_desc.extra_bits=zip_extra_dbits,zip_d_desc.extra_base=0,zip_d_desc.elems=30,zip_d_desc.max_length=15,zip_d_desc.max_code=0,zip_bl_desc.dyn_tree=zip_bl_tree,zip_bl_desc.static_tree=null,zip_bl_desc.extra_bits=zip_extra_blbits,zip_bl_desc.extra_base=0,zip_bl_desc.elems=19,zip_bl_desc.max_length=7,code=length=zip_bl_desc.max_code=0;code<28;code++)for(zip_base_length[code]=length,n=0;n<1<<zip_extra_lbits[code];n++)zip_length_code[length++]=code;for(zip_length_code[length-1]=code,code=dist=0;code<16;code++)for(zip_base_dist[code]=dist,n=0;n<1<<zip_extra_dbits[code];n++)zip_dist_code[dist++]=code;for(dist>>=7;code<30;code++)for(zip_base_dist[code]=dist<<7,n=0;n<1<<zip_extra_dbits[code]-7;n++)zip_dist_code[256+dist++]=code;for(bits=0;bits<=15;bits++)zip_bl_count[bits]=0;for(n=0;n<=143;)zip_static_ltree[n++].dl=8,zip_bl_count[8]++;for(;n<=255;)zip_static_ltree[n++].dl=9,zip_bl_count[9]++;for(;n<=279;)zip_static_ltree[n++].dl=7,zip_bl_count[7]++;for(;n<=287;)zip_static_ltree[n++].dl=8,zip_bl_count[8]++;for(zip_gen_codes(zip_static_ltree,287),n=0;n<30;n++)zip_static_dtree[n].dl=5,zip_static_dtree[n].fc=zip_bi_reverse(n,5);zip_init_block()}},zip_init_block=function(){var n;for(n=0;n<286;n++)zip_dyn_ltree[n].fc=0;for(n=0;n<30;n++)zip_dyn_dtree[n].fc=0;for(n=0;n<19;n++)zip_bl_tree[n].fc=0;zip_dyn_ltree[256].fc=1,zip_opt_len=zip_static_len=0,zip_last_lit=zip_last_dist=zip_last_flags=0,zip_flags=0,zip_flag_bit=1},zip_pqdownheap=function(tree,k){for(var v=zip_heap[k],j=k<<1;j<=zip_heap_len&&(j<zip_heap_len&&zip_SMALLER(tree,zip_heap[j+1],zip_heap[j])&&j++,!zip_SMALLER(tree,v,zip_heap[j]));)zip_heap[k]=zip_heap[j],k=j,j<<=1;zip_heap[k]=v},zip_gen_codes=function(tree,max_code){var bits,n,next_code=new Array(16),code=0;for(bits=1;bits<=15;bits++)code=code+zip_bl_count[bits-1]<<1,next_code[bits]=code;for(n=0;n<=max_code;n++){var len=tree[n].dl;0!=len&&(tree[n].fc=zip_bi_reverse(next_code[len]++,len))}},zip_build_tree=function(desc){var n,m,tree=desc.dyn_tree,stree=desc.static_tree,elems=desc.elems,max_code=-1,node=elems;for(zip_heap_max=573,n=zip_heap_len=0;n<elems;n++)0!=tree[n].fc?(zip_heap[++zip_heap_len]=max_code=n,zip_depth[n]=0):tree[n].dl=0;for(;zip_heap_len<2;){var xnew=zip_heap[++zip_heap_len]=max_code<2?++max_code:0;tree[xnew].fc=1,zip_depth[xnew]=0,zip_opt_len--,null!=stree&&(zip_static_len-=stree[xnew].dl)}for(desc.max_code=max_code,n=zip_heap_len>>1;1<=n;n--)zip_pqdownheap(tree,n);for(;n=zip_heap[1],zip_heap[1]=zip_heap[zip_heap_len--],zip_pqdownheap(tree,1),m=zip_heap[1],zip_heap[--zip_heap_max]=n,zip_heap[--zip_heap_max]=m,tree[node].fc=tree[n].fc+tree[m].fc,zip_depth[n]>zip_depth[m]+1?zip_depth[node]=zip_depth[n]:zip_depth[node]=zip_depth[m]+1,tree[n].dl=tree[m].dl=node,zip_heap[1]=node++,zip_pqdownheap(tree,1),2<=zip_heap_len;);zip_heap[--zip_heap_max]=zip_heap[1],function(desc){var h,n,m,bits,xbits,f,tree=desc.dyn_tree,extra=desc.extra_bits,base=desc.extra_base,max_code=desc.max_code,max_length=desc.max_length,stree=desc.static_tree,overflow=0;for(bits=0;bits<=15;bits++)zip_bl_count[bits]=0;for(tree[zip_heap[zip_heap_max]].dl=0,h=zip_heap_max+1;h<573;h++)max_length<(bits=tree[tree[n=zip_heap[h]].dl].dl+1)&&(bits=max_length,overflow++),tree[n].dl=bits,max_code<n||(zip_bl_count[bits]++,xbits=0,base<=n&&(xbits=extra[n-base]),f=tree[n].fc,zip_opt_len+=f*(bits+xbits),null!=stree&&(zip_static_len+=f*(stree[n].dl+xbits)));if(0!=overflow){do{for(bits=max_length-1;0==zip_bl_count[bits];)bits--;zip_bl_count[bits]--,zip_bl_count[bits+1]+=2,zip_bl_count[max_length]--,overflow-=2}while(0<overflow);for(bits=max_length;0!=bits;bits--)for(n=zip_bl_count[bits];0!=n;)max_code<(m=zip_heap[--h])||(tree[m].dl!=bits&&(zip_opt_len+=(bits-tree[m].dl)*tree[m].fc,tree[m].fc=bits),n--)}}(desc),zip_gen_codes(tree,max_code)},zip_scan_tree=function(tree,max_code){var n,curlen,prevlen=-1,nextlen=tree[0].dl,count=0,max_count=7,min_count=4;for(0==nextlen&&(max_count=138,min_count=3),tree[max_code+1].dl=65535,n=0;n<=max_code;n++)curlen=nextlen,nextlen=tree[n+1].dl,++count<max_count&&curlen==nextlen||(count<min_count?zip_bl_tree[curlen].fc+=count:0!=curlen?(curlen!=prevlen&&zip_bl_tree[curlen].fc++,zip_bl_tree[16].fc++):count<=10?zip_bl_tree[17].fc++:zip_bl_tree[18].fc++,prevlen=curlen,min_count=(count=0)==nextlen?(max_count=138,3):curlen==nextlen?(max_count=6,3):(max_count=7,4))},zip_send_tree=function(tree,max_code){var n,curlen,prevlen=-1,nextlen=tree[0].dl,count=0,max_count=7,min_count=4;for(0==nextlen&&(max_count=138,min_count=3),n=0;n<=max_code;n++)if(curlen=nextlen,nextlen=tree[n+1].dl,!(++count<max_count&&curlen==nextlen)){if(count<min_count)for(;zip_SEND_CODE(curlen,zip_bl_tree),0!=--count;);else 0!=curlen?(curlen!=prevlen&&(zip_SEND_CODE(curlen,zip_bl_tree),count--),zip_SEND_CODE(16,zip_bl_tree),zip_send_bits(count-3,2)):count<=10?(zip_SEND_CODE(17,zip_bl_tree),zip_send_bits(count-3,3)):(zip_SEND_CODE(18,zip_bl_tree),zip_send_bits(count-11,7));prevlen=curlen,min_count=(count=0)==nextlen?(max_count=138,3):curlen==nextlen?(max_count=6,3):(max_count=7,4)}},zip_flush_block=function(eof){var opt_lenb,static_lenb,max_blindex,stored_len,i;if(stored_len=zip_strstart-zip_block_start,zip_flag_buf[zip_last_flags]=zip_flags,zip_build_tree(zip_l_desc),zip_build_tree(zip_d_desc),max_blindex=function(){var max_blindex;for(zip_scan_tree(zip_dyn_ltree,zip_l_desc.max_code),zip_scan_tree(zip_dyn_dtree,zip_d_desc.max_code),zip_build_tree(zip_bl_desc),max_blindex=18;3<=max_blindex&&0==zip_bl_tree[zip_bl_order[max_blindex]].dl;max_blindex--);return zip_opt_len+=3*(max_blindex+1)+5+5+4,max_blindex}(),(static_lenb=zip_static_len+3+7>>3)<=(opt_lenb=zip_opt_len+3+7>>3)&&(opt_lenb=static_lenb),stored_len+4<=opt_lenb&&0<=zip_block_start)for(zip_send_bits(0+eof,3),zip_bi_windup(),zip_put_short(stored_len),zip_put_short(~stored_len),i=0;i<stored_len;i++)zip_put_byte(zip_window[zip_block_start+i]);else static_lenb==opt_lenb?(zip_send_bits(2+eof,3),zip_compress_block(zip_static_ltree,zip_static_dtree)):(zip_send_bits(4+eof,3),function(lcodes,dcodes,blcodes){var rank;for(zip_send_bits(lcodes-257,5),zip_send_bits(dcodes-1,5),zip_send_bits(blcodes-4,4),rank=0;rank<blcodes;rank++)zip_send_bits(zip_bl_tree[zip_bl_order[rank]].dl,3);zip_send_tree(zip_dyn_ltree,lcodes-1),zip_send_tree(zip_dyn_dtree,dcodes-1)}(zip_l_desc.max_code+1,zip_d_desc.max_code+1,max_blindex+1),zip_compress_block(zip_dyn_ltree,zip_dyn_dtree));zip_init_block(),0!=eof&&zip_bi_windup()},zip_ct_tally=function(dist,lc){if(zip_l_buf[zip_last_lit++]=lc,0==dist?zip_dyn_ltree[lc].fc++:(dist--,zip_dyn_ltree[zip_length_code[lc]+256+1].fc++,zip_dyn_dtree[zip_D_CODE(dist)].fc++,zip_d_buf[zip_last_dist++]=dist,zip_flags|=zip_flag_bit),zip_flag_bit<<=1,0==(7&zip_last_lit)&&(zip_flag_buf[zip_last_flags++]=zip_flags,zip_flags=0,zip_flag_bit=1),2<zip_compr_level&&0==(4095&zip_last_lit)){var dcode,out_length=8*zip_last_lit,in_length=zip_strstart-zip_block_start;for(dcode=0;dcode<30;dcode++)out_length+=zip_dyn_dtree[dcode].fc*(5+zip_extra_dbits[dcode]);if(out_length>>=3,zip_last_dist<parseInt(zip_last_lit/2)&&out_length<parseInt(in_length/2))return!0}return 8191==zip_last_lit||8192==zip_last_dist},zip_compress_block=function(ltree,dtree){var dist,lc,code,extra,lx=0,dx=0,fx=0,flag=0;if(0!=zip_last_lit)for(;0==(7&lx)&&(flag=zip_flag_buf[fx++]),lc=255&zip_l_buf[lx++],0==(1&flag)?zip_SEND_CODE(lc,ltree):(code=zip_length_code[lc],zip_SEND_CODE(code+256+1,ltree),0!=(extra=zip_extra_lbits[code])&&(lc-=zip_base_length[code],zip_send_bits(lc,extra)),dist=zip_d_buf[dx++],code=zip_D_CODE(dist),zip_SEND_CODE(code,dtree),0!=(extra=zip_extra_dbits[code])&&(dist-=zip_base_dist[code],zip_send_bits(dist,extra))),flag>>=1,lx<zip_last_lit;);zip_SEND_CODE(256,ltree)},zip_send_bits=function(value,length){16-length<zip_bi_valid?(zip_put_short(zip_bi_buf|=value<<zip_bi_valid),zip_bi_buf=value>>16-zip_bi_valid,zip_bi_valid+=length-16):(zip_bi_buf|=value<<zip_bi_valid,zip_bi_valid+=length)},zip_bi_reverse=function(code,len){for(var res=0;res|=1&code,code>>=1,res<<=1,0<--len;);return res>>1},zip_bi_windup=function(){8<zip_bi_valid?zip_put_short(zip_bi_buf):0<zip_bi_valid&&zip_put_byte(zip_bi_buf),zip_bi_valid=zip_bi_buf=0},zip_qoutbuf=function(){if(0!=zip_outcnt){var q,i;for(null!=zip_free_queue?zip_free_queue=(p=zip_free_queue).next:p=new zip_DeflateBuffer,p.next=null,p.len=p.off=0,q=p,null==zip_qhead?zip_qhead=zip_qtail=q:zip_qtail=zip_qtail.next=q,q.len=zip_outcnt-zip_outoff,i=0;i<q.len;i++)q.ptr[i]=zip_outbuf[zip_outoff+i];zip_outcnt=zip_outoff=0}var p};module.exports=function(str,level){var i,j;zip_deflate_data=str,void(zip_deflate_pos=0)===level&&(level=6),function(level){var i;if(level?level<1?level=1:9<level&&(level=9):level=6,zip_compr_level=level,zip_eofile=zip_initflag=!1,null==zip_outbuf){for(zip_free_queue=zip_qhead=zip_qtail=null,zip_outbuf=new Array(8192),zip_window=new Array(65536),zip_d_buf=new Array(8192),zip_l_buf=new Array(32832),zip_prev=new Array(65536),zip_dyn_ltree=new Array(573),i=0;i<573;i++)zip_dyn_ltree[i]=new zip_DeflateCT;for(zip_dyn_dtree=new Array(61),i=0;i<61;i++)zip_dyn_dtree[i]=new zip_DeflateCT;for(zip_static_ltree=new Array(288),i=0;i<288;i++)zip_static_ltree[i]=new zip_DeflateCT;for(zip_static_dtree=new Array(30),i=0;i<30;i++)zip_static_dtree[i]=new zip_DeflateCT;for(zip_bl_tree=new Array(39),i=0;i<39;i++)zip_bl_tree[i]=new zip_DeflateCT;zip_l_desc=new zip_DeflateTreeDesc,zip_d_desc=new zip_DeflateTreeDesc,zip_bl_desc=new zip_DeflateTreeDesc,zip_bl_count=new Array(16),zip_heap=new Array(573),zip_depth=new Array(573),zip_length_code=new Array(256),zip_dist_code=new Array(512),zip_base_length=new Array(29),zip_base_dist=new Array(30),zip_flag_buf=new Array(parseInt(1024))}}(level);for(var buff=new Array(1024),aout=[];0<(i=zip_deflate_internal(buff,0,buff.length));){var cbuf=new Array(i);for(j=0;j<i;j++)cbuf[j]=String.fromCharCode(buff[j]);aout[aout.length]=cbuf.join("")}return zip_deflate_data=null,aout.join("")}},{}],3:[function(require,module,exports){var deflate=require("./deflate");module.exports=function(str){return window.btoa(deflate(unescape(encodeURIComponent(str))))}},{"./deflate":2}]},{},[1]);